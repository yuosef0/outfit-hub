export default function CustomerHome() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-[#0f1a0f] text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-50/90 dark:bg-[#0f1a0f]/90 backdrop-blur-md">
        <div className="flex items-center p-4 pb-2 justify-between gap-2">
          <div className="flex items-center gap-1 flex-1 cursor-pointer">
            <span className="material-symbols-outlined text-emerald-700 dark:text-emerald-500" style={{ fontSize: '20px' }}>location_on</span>
            <h2 className="text-gray-900 dark:text-white text-sm font-bold leading-tight">Cairo, Egypt</h2>
            <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '18px' }}>expand_more</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-full p-0.5 bg-gray-100 dark:bg-gray-800">
              <button className="px-3 py-1 text-[10px] font-bold bg-white dark:bg-emerald-700 rounded-full shadow-sm text-emerald-700 dark:text-white">EN</button>
              <button className="px-3 py-1 text-[10px] font-bold text-gray-500">AR</button>
            </div>
            <button className="relative flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>notifications</span>
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-50 dark:ring-[#0f1a0f]"></span>
            </button>
          </div>
        </div>
        <div className="px-4 py-3">
          <label className="flex flex-col w-full">
            <div className="flex w-full items-center rounded-xl bg-white dark:bg-gray-800 h-12 border border-gray-200 dark:border-gray-700 focus-within:border-emerald-500/50 transition-all shadow-sm">
              <div className="text-gray-400 flex items-center justify-center pl-4">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-400 px-3 text-sm"
                placeholder="Search for brands, products..."
                readOnly
              />
            </div>
          </label>
        </div>
      </header>

      <main className="flex-1 pb-24">
        {/* Hero Banner */}
        <section className="px-4 py-2">
          <div className="relative group">
            <div className="aspect-[16/8] w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 shadow-lg">
              <div
                className="h-full w-full bg-cover bg-center flex flex-col justify-center p-8"
                style={{
                  backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRUapn-E7DT-YSpdwH5kAT78hKuBOyeMhjmClqumtPFoEtomw59Bg3fxpOzFVEBtr7-odUw9yWKjsZeCJwTWT2Mil_cydzBvh7ww7ii_X7zLqFm7ECrKQT9PC2tI_WM2Y_lcevfZmVVe1NCtsjUQXHShmE_i643owZpBVjjd0KdMBzD51xh5G56rfEuKIPArTx2RjmKHOuZrlXQyyHImovkwQsnJbeTWBKjB9HCXhhEwG9h2KEb0T1_jP7vO1DiHebYBBPrIkY-3c')`
                }}
              >
                <span className="text-white/80 text-xs font-bold tracking-widest uppercase mb-2">Summer Sale</span>
                <h3 className="text-white text-2xl font-bold mb-4">Up to 50% Off<br/>Selected Shoes</h3>
                <button className="w-fit bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-md">Shop Now</button>
              </div>
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-2 py-4">
              <div className="h-1.5 w-4 rounded-full bg-emerald-600"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-4">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Categories</h3>
            <a className="text-emerald-600 dark:text-emerald-500 text-sm font-semibold" href="#">See All</a>
          </div>
          <div className="flex overflow-x-auto gap-6 px-4 no-scrollbar">
            {[
              { icon: 'checkroom', label: 'Clothing' },
              { icon: 'ice_skating', label: 'Shoes' },
              { icon: 'watch', label: 'Accessories' },
              { icon: 'shopping_bag', label: 'Bags' },
              { icon: 'diamond', label: 'Jewelry' },
            ].map((category) => (
              <div key={category.label} className="flex flex-col items-center gap-2 min-w-[70px]">
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800">
                  <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>{category.icon}</span>
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{category.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Stores */}
        <section className="py-4">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Featured Stores</h3>
            <a className="text-emerald-600 dark:text-emerald-500 text-sm font-semibold" href="#">See All</a>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
            {[
              { name: 'Velvet Vibe', category: 'Boutique', rating: '4.8', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtMc2XKdP04icoFTp9Vt0MfBcA3nm95ubcD5yNG3q_4zYSujbbnimtc0CGHf9m-8-nVm2L4lQhBppt0NfGCTfz4oaKvdO2L1pNVcq20i6yUZ1bZZARuu6NXrhoBUaPnpxHDEQ-MV4iMji62obf4hU6ZSAB7jFQjjCEGrtPmgdAESqFTsieLW-qpPgjNDYJnQuqnk0KhMlkSr7FDWFQjVk14JNrpqN8qxwEaGLutlirOsCIi8Zy8DuqeYXD9FlzCj3H_rYvv1krWj0' },
              { name: 'Urban Edge', category: 'Streetwear', rating: '4.9', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp3yolNqOmqbAJ_g-wvWXni4DypuJ0Xbz4bYPhZyMp1l8_Bm1qh17-aRTMa6-s428NNyT-KAEr-qkHOOQNiPGsOCdCyo3eNxJOOXxQskA7P11EZ39G9_r9RTnQ2ZV9LVUAicK3TC-woIC6dGPajhcpd4CL8QKdIb9h8dK4vQKU51yTZlPotMnBihgNeZ-aqyNpZjq8zjKj_phypfMqRQf0HqC7b-_xONRzeLKthP_tlLLzFBFjmU9CgOFfvw39UJ1IiyzV_sHlKI4' },
            ].map((store) => (
              <div key={store.name} className="min-w-[180px] bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-cover" style={{ backgroundImage: `url('${store.image}')` }}></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{store.name}</h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{store.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <span className="material-symbols-outlined text-amber-500 filled" style={{ fontSize: '14px' }}>star</span>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{store.rating}</span>
                </div>
                <button className="w-full py-2.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-lg border border-emerald-100 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">Visit</button>
              </div>
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-4">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">New Arrivals</h3>
            <a className="text-emerald-600 dark:text-emerald-500 text-sm font-semibold" href="#">See All</a>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
            {[
              { name: 'Air Cushioned Sneakers', store: 'Stride Lab', price: 'EGP 2,450', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOAXtfmZGtQv17ROrnIXMt7Z-AN-qD2ZEQOT7HlXiXZ3y6O558bQQ3dq44ZU3hs_Fr4uDkKY_IZc5BKg33nnPibXiZKHft40oTclsyKOX9WHmXE1SZVvfEG3pWHoEBJm2AInNYr-irtQ3bZvfZZd-OzM5nRoiC1NXqtPeaaoeCNv4eThgdwSYwJNdYV1IwhJuLXB-xVh5zYyrIVS2LpMaXFJyDfD25MR_MkGvuWVsCtlveUnU3ujt38gQ8cbxZQ4CFaLSBxHNNkk8' },
              { name: 'Structured Leather Bag', store: 'Noir Chic', price: 'EGP 4,200', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiO_LNzCNZJD5pF7wSsdb4du1WbvSfwVIaX9r9lycjVgEFhRpUlZuFR4HAWC32AGZC3Ev3t7UPrqJP5XSfdp_hQpMeanqjboq7f6_H_L64NYTeDprtQMOPs0CDbLJc7KVZLEqL9uDVGn9rcxnPvG_08IasvMuxZL2ga63r7fL_Fvz6nyN0h4SUsnjafXgYm7gjnxR2DR5hzeKu6GXc2-72YcfuECK0Z5CaRF-Sgn1dJVKWSRh7H-NQSYhKieaDPxAGHeMmW2EGES0' },
            ].map((product) => (
              <div key={product.name} className="min-w-[160px] flex flex-col gap-2">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm">
                  <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${product.image}')` }}></div>
                  <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 dark:bg-gray-900/70 backdrop-blur-sm flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors shadow-sm">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>favorite</span>
                  </button>
                </div>
                <div>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-wider">{product.store}</p>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{product.name}</h4>
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-500 mt-1">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="py-4">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Special Offers</h3>
            <a className="text-emerald-600 dark:text-emerald-500 text-sm font-semibold" href="#">See All</a>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
            <div className="min-w-[280px] h-32 rounded-xl border-2 border-dashed border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 p-4 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-emerald-200/50 dark:bg-emerald-800/30 rounded-full"></div>
              <div>
                <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">30% OFF</span>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">at Zara Nile City Mall</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Valid until Oct 15</span>
                <span className="text-[10px] bg-emerald-600 text-white px-3 py-1 rounded-md font-bold">CLAIM</span>
              </div>
            </div>
            <div className="min-w-[280px] h-32 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex flex-col justify-between relative overflow-hidden">
              <div>
                <span className="text-2xl font-black text-gray-900 dark:text-white">FREE SHIPPING</span>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">on orders above EGP 1000</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Limited Time</span>
                <span className="text-[10px] bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-3 py-1 rounded-md font-bold">AUTO</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-6 py-3 flex justify-between items-center z-50 shadow-lg shadow-gray-200/50 dark:shadow-none">
        <button className="flex flex-col items-center gap-1 text-emerald-600 dark:text-emerald-500">
          <span className="material-symbols-outlined filled">home</span>
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px] font-bold">Mall</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">
          <span className="material-symbols-outlined">favorite</span>
          <span className="text-[10px] font-bold">Saved</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="text-[10px] font-bold">Cart</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>
    </div>
  );
}
