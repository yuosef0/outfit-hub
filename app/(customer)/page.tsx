export default function CustomerHome() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 pb-2 justify-between gap-2">
          <div className="flex items-center gap-1 flex-1 cursor-pointer">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>location_on</span>
            <h2 className="text-slate-900 dark:text-white text-sm font-bold leading-tight">Cairo, Egypt</h2>
            <span className="material-symbols-outlined text-slate-400" style={{ fontSize: '18px' }}>expand_more</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex border border-slate-200 dark:border-slate-800 rounded-full p-0.5 bg-slate-100 dark:bg-slate-900">
              <button className="px-3 py-1 text-[10px] font-bold bg-white dark:bg-primary rounded-full shadow-sm text-primary dark:text-white">EN</button>
              <button className="px-3 py-1 text-[10px] font-bold text-slate-500">AR</button>
            </div>
            <button className="relative flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>notifications</span>
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-background-dark"></span>
            </button>
          </div>
        </div>
        <div className="px-4 py-3">
          <label className="flex flex-col w-full">
            <div className="flex w-full items-center rounded-xl bg-slate-100 dark:bg-slate-900 h-12 border border-transparent focus-within:border-primary/30 transition-all">
              <div className="text-slate-400 flex items-center justify-center pl-4">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 px-3 text-sm"
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
            <div className="aspect-[16/8] w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full w-full bg-cover bg-center flex flex-col justify-center p-8"
                style={{
                  backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRUapn-E7DT-YSpdwH5kAT78hKuBOyeMhjmClqumtPFoEtomw59Bg3fxpOzFVEBtr7-odUw9yWKjsZeCJwTWT2Mil_cydzBvh7ww7ii_X7zLqFm7ECrKQT9PC2tI_WM2Y_lcevfZmVVe1NCtsjUQXHShmE_i643owZpBVjjd0KdMBzD51xh5G56rfEuKIPArTx2RjmKHOuZrlXQyyHImovkwQsnJbeTWBKjB9HCXhhEwG9h2KEb0T1_jP7vO1DiHebYBBPrIkY-3c')`
                }}
              >
                <span className="text-white/80 text-xs font-bold tracking-widest uppercase mb-2">Summer Sale</span>
                <h3 className="text-white text-2xl font-bold mb-4">Up to 50% Off<br/>Selected Shoes</h3>
                <button className="w-fit bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold">Shop Now</button>
              </div>
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-2 py-4">
              <div className="h-1.5 w-4 rounded-full bg-primary"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-4">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Categories</h3>
            <a className="text-primary text-sm font-semibold" href="#">See All</a>
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
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>{category.icon}</span>
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{category.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Stores */}
        <section className="py-4">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Featured Stores</h3>
            <a className="text-primary text-sm font-semibold" href="#">See All</a>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
            {[
              { name: 'Velvet Vibe', category: 'Boutique', rating: '4.8', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtMc2XKdP04icoFTp9Vt0MfBcA3nm95ubcD5yNG3q_4zYSujbbnimtc0CGHf9m-8-nVm2L4lQhBppt0NfGCTfz4oaKvdO2L1pNVcq20i6yUZ1bZZARuu6NXrhoBUaPnpxHDEQ-MV4iMji62obf4hU6ZSAB7jFQjjCEGrtPmgdAESqFTsieLW-qpPgjNDYJnQuqnk0KhMlkSr7FDWFQjVk14JNrpqN8qxwEaGLutlirOsCIi8Zy8DuqeYXD9FlzCj3H_rYvv1krWj0' },
              { name: 'Urban Edge', category: 'Streetwear', rating: '4.9', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp3yolNqOmqbAJ_g-wvWXni4DypuJ0Xbz4bYPhZyMp1l8_Bm1qh17-aRTMa6-s428NNyT-KAEr-qkHOOQNiPGsOCdCyo3eNxJOOXxQskA7P11EZ39G9_r9RTnQ2ZV9LVUAicK3TC-woIC6dGPajhcpd4CL8QKdIb9h8dK4vQKU51yTZlPotMnBihgNeZ-aqyNpZjq8zjKj_phypfMqRQf0HqC7b-_xONRzeLKthP_tlLLzFBFjmU9CgOFfvw39UJ1IiyzV_sHlKI4' },
            ].map((store) => (
              <div key={store.name} className="min-w-[180px] bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-cover" style={{ backgroundImage: `url('${store.image}')` }}></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold line-clamp-1">{store.name}</h4>
                    <p className="text-[10px] text-slate-500">{store.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 filled" style={{ fontSize: '14px' }}>star</span>
                  <span className="text-xs font-bold">{store.rating}</span>
                </div>
                <button className="w-full py-2 bg-primary/10 text-primary text-xs font-bold rounded-lg">Visit</button>
              </div>
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-4">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">New Arrivals</h3>
            <a className="text-primary text-sm font-semibold" href="#">See All</a>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
            {[
              { name: 'Air Cushioned Sneakers', store: 'Stride Lab', price: 'EGP 2,450', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOAXtfmZGtQv17ROrnIXMt7Z-AN-qD2ZEQOT7HlXiXZ3y6O558bQQ3dq44ZU3hs_Fr4uDkKY_IZc5BKg33nnPibXiZKHft40oTclsyKOX9WHmXE1SZVvfEG3pWHoEBJm2AInNYr-irtQ3bZvfZZd-OzM5nRoiC1NXqtPeaaoeCNv4eThgdwSYwJNdYV1IwhJuLXB-xVh5zYyrIVS2LpMaXFJyDfD25MR_MkGvuWVsCtlveUnU3ujt38gQ8cbxZQ4CFaLSBxHNNkk8' },
              { name: 'Structured Leather Bag', store: 'Noir Chic', price: 'EGP 4,200', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiO_LNzCNZJD5pF7wSsdb4du1WbvSfwVIaX9r9lycjVgEFhRpUlZuFR4HAWC32AGZC3Ev3t7UPrqJP5XSfdp_hQpMeanqjboq7f6_H_L64NYTeDprtQMOPs0CDbLJc7KVZLEqL9uDVGn9rcxnPvG_08IasvMuxZL2ga63r7fL_Fvz6nyN0h4SUsnjafXgYm7gjnxR2DR5hzeKu6GXc2-72YcfuECK0Z5CaRF-Sgn1dJVKWSRh7H-NQSYhKieaDPxAGHeMmW2EGES0' },
            ].map((product) => (
              <div key={product.name} className="min-w-[160px] flex flex-col gap-2">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${product.image}')` }}></div>
                  <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>favorite</span>
                  </button>
                </div>
                <div>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{product.store}</p>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">{product.name}</h4>
                  <p className="text-sm font-bold text-primary mt-1">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="py-4">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Special Offers</h3>
            <a className="text-primary text-sm font-semibold" href="#">See All</a>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
            <div className="min-w-[280px] h-32 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-4 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/10 rounded-full"></div>
              <div>
                <span className="text-2xl font-black text-primary">30% OFF</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">at Zara Nile City Mall</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Valid until Oct 15</span>
                <span className="text-[10px] bg-primary text-white px-2 py-1 rounded">CLAIM</span>
              </div>
            </div>
            <div className="min-w-[280px] h-32 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col justify-between relative overflow-hidden">
              <div>
                <span className="text-2xl font-black text-slate-900 dark:text-white">FREE SHIPPING</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">on orders above EGP 1000</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Limited Time</span>
                <span className="text-[10px] bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-2 py-1 rounded">AUTO</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined filled">home</span>
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px] font-bold">Mall</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">favorite</span>
          <span className="text-[10px] font-bold">Saved</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="text-[10px] font-bold">Cart</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>
    </div>
  );
}
