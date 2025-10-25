import ProductDetails from "./ProductDetails"

export async function generateMetadata({ params }) {
    const { id } = params

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
            cache: "no-store",
        })

        const data = await res.json()
        const product = data?.product

        if (!product) {
            return {
                title: "পণ্য পাওয়া যায়নি",
                description: "এই পণ্যটি এখন আর পাওয়া যাচ্ছে না।",
            }
        }

        const discountedPrice =
            product.discount && product.discount > 0
                ? Math.round(product.price - (product.price * product.discount) / 100)
                : product.price

        const images = Array.isArray(product.product_image)
            ? product.product_image.map((img) =>
                img.startsWith("http")
                    ? img
                    : `${process.env.NEXT_PUBLIC_BASE_URL}${img}`
            )
            : [
                product.product_image?.startsWith("http")
                    ? product.product_image
                    : `${process.env.NEXT_PUBLIC_BASE_URL}${product.product_image}`,
            ]

        return {
            title: product.product_name || "পণ্য",
            description: product.details || "বিস্তারিত পাওয়া যায়নি।",
            openGraph: {
                title: product.product_name || "পণ্য",
                description: product.details || "বিস্তারিত পাওয়া যায়নি।",
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/components/products/${id}`,
                images: images.map((url) => ({
                    url,
                    width: 1200,
                    height: 630,
                    alt: product.product_name || "Product Image",
                })),
                type: "website",
            },
            other: {
                "product:price:amount": discountedPrice,
                "product:price:currency": "BDT",
            },

        }
    } catch (err) {
        console.error("🧩 Product Metadata Error:", err)
        return {
            title: "Error",
            description: "পণ্যের তথ্য লোড করতে সমস্যা হয়েছে।",
        }
    }
}

// 🌸 Server Component: ProductDetails Render
export default async function ProductPage({ params }) {
    const { id } = params

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
            cache: "no-store",
        })

        if (!res.ok) throw new Error("Failed to fetch product")

        const data = await res.json()
        const product = data?.product || null

        if (!product) {
            return (
                <div className="flex justify-center items-center py-20">
                    <p className="text-center text-red-500 text-lg font-semibold">
                        ❌ কোনো পণ্য পাওয়া যায়নি
                    </p>
                </div>
            )
        }

        return <ProductDetails product={product} />
    } catch (err) {
        console.error("🔥 ProductPage Error:", err)
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-center text-red-500 text-lg font-semibold">
                    ❌ পণ্য লোড করতে সমস্যা হয়েছে
                </p>
            </div>
        )
    }
}
