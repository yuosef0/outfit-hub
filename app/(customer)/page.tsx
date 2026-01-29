export default function CustomerHome() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top App Bar */}
      <header className="flex flex-col gap-2 p-4 pb-2 bg-background-light dark:bg-background-dark sticky top-0 z-10">
        <div className="flex items-center h-12 justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-text-light-primary dark:text-text-dark-primary text-2xl">
              location_on
            </span>
            <p className="text-text-light-primary dark:text-text-dark-primary tracking-light text-base font-bold leading-tight">
              Cairo, Egypt
            </p>
            <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-xl">
              expand_more
            </span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button className="flex items-center justify-center rounded-full h-10 w-10 bg-transparent text-text-light-primary dark:text-text-dark-primary">
              <span className="material-symbols-outlined text-2xl relative">
                notifications
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-background-light dark:ring-background-dark"></span>
              </span>
            </button>
            <button className="flex items-center justify-center rounded-full h-10 w-10 text-text-light-primary dark:text-text-dark-primary text-sm font-bold bg-border-light dark:bg-card-dark">
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3 sticky top-[72px] z-10 bg-background-light dark:bg-background-dark">
        <div className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-text-light-secondary dark:text-text-dark-secondary flex border-none bg-card-light dark:bg-card-dark items-center justify-center pl-4 rounded-l-xl border-r-0">
              <span className="material-symbols-outlined text-2xl">search</span>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-light-primary dark:text-text-dark-primary focus:outline-0 focus:ring-0 border-none bg-card-light dark:bg-card-dark focus:border-none h-full placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              placeholder="Search for stores & products"
            />
          </div>
        </div>
      </div>

      <main className="flex flex-col gap-6 pb-24">
        {/* Hero Carousel */}
        <section className="flex flex-col gap-4">
          <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-stretch px-4 gap-3">
              <div className="flex h-full flex-1 flex-col gap-4 rounded-xl min-w-[calc(100vw-2rem)]">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col bg-gradient-to-r from-primary to-green-700"></div>
              </div>
              <div className="flex h-full flex-1 flex-col gap-4 rounded-xl min-w-[calc(100vw-2rem)]">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col bg-gradient-to-r from-blue-600 to-blue-800"></div>
              </div>
              <div className="flex h-full flex-1 flex-col gap-4 rounded-xl min-w-[calc(100vw-2rem)]">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col bg-gradient-to-r from-purple-600 to-purple-800"></div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-center gap-2">
            <div className="h-2 w-4 rounded-full bg-primary"></div>
            <div className="h-2 w-2 rounded-full bg-border-light dark:bg-border-dark"></div>
            <div className="h-2 w-2 rounded-full bg-border-light dark:bg-border-dark"></div>
          </div>
        </section>

        {/* Categories */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-text-light-primary dark:text-text-dark-primary text-lg font-bold leading-tight tracking-[-0.015em]">
              Categories
            </h3>
            <a className="text-primary text-sm font-semibold" href="#">
              See All
            </a>
          </div>
          <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 gap-4">
            {[
              { icon: 'styler', label: 'Clothing' },
              { icon: 'footprint', label: 'Shoes' },
              { icon: 'shopping_bag', label: 'Bags' },
              { icon: 'watch', label: 'Accessories' },
              { icon: 'diamond', label: 'Jewelry' },
            ].map((category) => (
              <div key={category.label} className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-card-light dark:bg-card-dark flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    {category.icon}
                  </span>
                </div>
                <p className="text-text-light-secondary dark:text-text-dark-secondary text-xs font-medium">
                  {category.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Stores */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-text-light-primary dark:text-text-dark-primary text-lg font-bold leading-tight tracking-[-0.015em]">
              Featured Stores
            </h3>
            <a className="text-primary text-sm font-semibold" href="#">
              See All
            </a>
          </div>
          <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 gap-4">
            {[
              { name: 'Fashion Forward', category: 'Clothing', rating: '4.8' },
              { name: 'Sole Mates', category: 'Shoes', rating: '4.9' },
            ].map((store) => (
              <div key={store.name} className="flex flex-col w-64 rounded-xl p-4 gap-4 bg-card-light dark:bg-card-dark flex-shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl">store</span>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-text-light-primary dark:text-text-dark-primary">
                      {store.name}
                    </h4>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      {store.category}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-400 text-base filled">
                      star
                    </span>
                    <p className="text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary">
                      {store.rating}
                    </p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                    Visit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-text-light-primary dark:text-text-dark-primary text-lg font-bold leading-tight tracking-[-0.015em]">
              New Arrivals
            </h3>
            <a className="text-primary text-sm font-semibold" href="#">
              See All
            </a>
          </div>
          <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 gap-4">
            {[
              { name: 'Modern Trench Coat', store: 'Chic Boutique', price: '$120.00' },
              { name: 'Urban Sneakers', store: 'Sole Mates', price: '$85.00' },
              { name: 'Leather Crossbody', store: 'Bags & Co.', price: '$99.00' },
            ].map((product) => (
              <div key={product.name} className="flex flex-col w-40 flex-shrink-0 gap-2">
                <div className="relative w-full aspect-square rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                  <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-text-light-primary text-xl">
                      favorite_border
                    </span>
                  </button>
                </div>
                <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                  {product.store}
                </p>
                <h4 className="font-semibold text-sm text-text-light-primary dark:text-text-dark-primary">
                  {product.name}
                </h4>
                <p className="font-bold text-text-light-primary dark:text-text-dark-primary">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark flex justify-around items-center px-4 pb-4">
        <a className="flex flex-col items-center gap-1 text-primary" href="#">
          <span className="material-symbols-outlined filled">home</span>
          <span className="text-xs font-bold">Home</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-text-light-secondary dark:text-text-dark-secondary" href="#">
          <span className="material-symbols-outlined">widgets</span>
          <span className="text-xs">Categories</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-text-light-secondary dark:text-text-dark-secondary" href="#">
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="text-xs">Cart</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-text-light-secondary dark:text-text-dark-secondary" href="#">
          <span className="material-symbols-outlined">person</span>
          <span className="text-xs">Profile</span>
        </a>
      </nav>
    </div>
  );
}
