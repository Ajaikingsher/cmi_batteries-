import { db } from "@/lib/db";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils/api";
import { Plus, Search, Package, Edit, Eye } from "lucide-react";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const { page: pageParam, search = "" } = await searchParams;
  const page = Number(pageParam ?? 1);
  const limit = 20;

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { sku: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      include: {
        category: { select: { name: true } },
        inventory: { select: { quantity: true, lowStockThreshold: true } },
        images: { where: { isPrimary: true }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.product.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Products</h1>
          <p className="text-gray-400 text-sm mt-0.5">{total} total products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-primary text-black font-heading font-bold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Search */}
      <form className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          name="search"
          defaultValue={search}
          placeholder="Search by name or SKU…"
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
        />
      </form>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-white/10">
                <th className="text-left p-4">Product</th>
                <th className="text-left p-4">SKU</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Stock</th>
                <th className="text-left p-4">Status</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    No products found
                  </td>
                </tr>
              )}
              {products.map((p) => {
                const qty = p.inventory?.quantity ?? 0;
                const low = qty <= (p.inventory?.lowStockThreshold ?? 10);
                return (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <p className="text-white font-medium line-clamp-1">{p.name}</p>
                      {p.isFeatured && (
                        <span className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded">Featured</span>
                      )}
                    </td>
                    <td className="p-4 font-mono text-gray-400 text-xs">{p.sku}</td>
                    <td className="p-4 text-gray-300">{p.category.name}</td>
                    <td className="p-4 text-white">{formatCurrency(Number(p.price))}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        qty === 0 ? "bg-red-400/10 text-red-400"
                          : low ? "bg-orange-400/10 text-orange-400"
                          : "bg-green-400/10 text-green-400"
                      }`}>
                        {qty} units
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        p.isActive ? "bg-green-400/10 text-green-400" : "bg-gray-400/10 text-gray-400"
                      }`}>
                        {p.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/products/${p.slug}`} target="_blank" className="text-gray-500 hover:text-white transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/products/${p.id}/edit`} className="text-gray-500 hover:text-primary transition-colors">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteProductButton id={p.id} name={p.name} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/products?page=${p}&search=${search}`}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-colors ${
                p === page ? "bg-primary text-black font-bold" : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
