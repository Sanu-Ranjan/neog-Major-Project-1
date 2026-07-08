const { OpenAI } = require("openai");
const { Product } = require("../models/models.index");
const { err, failure, ok, success } = require("../utils/response");

const client = new OpenAI();
const MODEL = "gpt-4o-mini";

const buildSystemPrompt = (catalog) => `# ROLE
You are a product search engine for GrillMart, an e-commerce store selling BBQ, grill, tandoor and baking equipment, plus spices.

# TASK
The customer's search found no keyword matches. Analyse the intent behind the search term (home vs outdoor, budget, problem to solve, skill level) and find similar/relevant products from the catalog.

# RULES
- Match ONLY products from the catalog below, using their "id" field.
- Assume the customer is a home user unless they mention commercial, restaurant, or outdoor use.
- Never include products where inStock is false.
- Return at most 4 products, ordered from lowest price to highest.
- For home use, prefer compact/electric equipment over clay tandoors or large commercial equipment, unless explicitly asked.
- If the search term is meaningless or nothing in the catalog is relevant, return an empty productIds array.

# OUTPUT FORMAT
Respond with ONLY valid JSON, no markdown, no backticks, no extra text:
{"productIds": ["id1", "id2"], "message": "one short friendly sentence about what you found"}

If nothing matches:
{"productIds": [], "message": ""}

# PRODUCT CATALOG
${JSON.stringify(catalog)}`;

const searchWithAi = async (query) => {
  try {
    const products = await Product.find()
      .select("name description price rating inStock")
      .lean();

    const catalog = products.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      rating: p.rating,
      inStock: p.inStock,
    }));

    const response = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: buildSystemPrompt(catalog) },
        { role: "user", content: query },
      ],
      temperature: 0.3,
      max_tokens: 200,
      response_format: { type: "json_object" },
    });

    const parsed = JSON.parse(response.choices[0].message.content);
    const productIds = parsed.productIds ?? [];

    if (productIds.length === 0) return ok({ products: [], message: "" });

    const found = await Product.find({ _id: { $in: productIds } }).populate(
      "category",
    );

    // preserve AI's price ordering
    const orderedProducts = productIds
      .map((id) => found.find((p) => p._id.toString() === id))
      .filter(Boolean);

    return ok({ products: orderedProducts, message: parsed.message ?? "" });
  } catch (error) {
    return err(error);
  }
};

const aiSearch = async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== "string" || query.trim() === "") {
    return res.status(400).json(failure("Search query is required"));
  }
  try {
    const { data, error } = await searchWithAi(query.trim().slice(0, 200));
    if (error) {
      console.log("Error in AI search", error);
      return res
        .status(500)
        .json(failure("Internal server error : AI search failed"));
    }
    res.status(200).json(success(data, "AI search results"));
  } catch (error) {
    console.log("Error at controller: aiSearch", error);
    res.status(500).json(failure("Internal server error"));
  }
};

module.exports = { aiSearch };
