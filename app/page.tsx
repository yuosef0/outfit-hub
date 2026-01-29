'use client';

export default function HomePage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
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
              defaultValue=""
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
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col"
                  data-alt="Promotional banner for a new clothing collection"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFEj2Mi5vrDQu_v-yVcHFa9x9JNTDgoHiQ2CT91363VXe-JgX5EM0A09IbeIEX9i3rpkc0f2s8avF99I5QSj-KwYhRKRCCYnYhKWTz3HxDDjc-__QYFnvxxtC7Lt8yXHyaSxBudUQnulNB3BnbiE5bJpzmjjAseipaEkL-G-arAYCHLjxJHWNAtzBld1Xavbn5cGJa_akqtBihsp_xwMWiRS8MIcqDj3SZ9_IyUqOQk6iunJBWKU8hCAaVF5WnhfaIYigQ2-8hiWk")',
                  }}
                ></div>
              </div>
              <div className="flex h-full flex-1 flex-col gap-4 rounded-xl min-w-[calc(100vw-2rem)]">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col"
                  data-alt="Advertisement for a shoe sale event"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQE1sfkxzoraRkpHdJeMnCVn0jbsgKra2X1T0Ux7lymavmd4IYV3n8pvO3SwvxN2rckDFhYT1cNTNQpzTTQTFIeOXP_sjYXTSGkc4t2PIvm98hMlHkP_KZ1Ah-jsWXFzZmrcW28FOe1ogbGk_UwhDbMgVZa39oB1IAyCUfIck8q_X1EMFoycwuBaLbnMHPVySpK-JcPPcaoK3l7Zcz3rZNI_-mOQHYvEBMRXK2Cylk7YqOjh8jeYGTFBjB2_IxzaEQLXj3JPu9-YA")',
                  }}
                ></div>
              </div>
              <div className="flex h-full flex-1 flex-col gap-4 rounded-xl min-w-[calc(100vw-2rem)]">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col"
                  data-alt="Special offer on fashion accessories"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAxT6encIdTyA15kYFLjnt--FWVNMaXueYT4WpOgQXsrd5LLtxxlxvI0-IqjiXs_JyuMci-8CJsyju5jiMvPAOpVT_DkcCcx53ejMP7uAmT9Jr3zthysntmvuvqBfwRQxpAkKz8bGQaqMGaMqJ-PDaS1O3gzq_KI7djd2HvtJsQYrPWFO0ozmxNqU16B8vTAvfxz_Ne1RTM4aC1EaVZYmkzKoveD6SAAtcK8uLHk-SX7EjrxSPBTbrilVJpcWvMZyw9tHZp68em27U")',
                  }}
                ></div>
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
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-card-light dark:bg-card-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">
                  styler
                </span>
              </div>
              <p className="text-text-light-secondary dark:text-text-dark-secondary text-xs font-medium">
                Clothing
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-card-light dark:bg-card-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">
                  footprint
                </span>
              </div>
              <p className="text-text-light-secondary dark:text-text-dark-secondary text-xs font-medium">
                Shoes
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-card-light dark:bg-card-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">
                  shopping_bag
                </span>
              </div>
              <p className="text-text-light-secondary dark:text-text-dark-secondary text-xs font-medium">
                Bags
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-card-light dark:bg-card-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">
                  watch
                </span>
              </div>
              <p className="text-text-light-secondary dark:text-text-dark-secondary text-xs font-medium">
                Accessories
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-card-light dark:bg-card-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">
                  diamond
                </span>
              </div>
              <p className="text-text-light-secondary dark:text-text-dark-secondary text-xs font-medium">
                Jewelry
              </p>
            </div>
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
            <div className="flex flex-col w-64 rounded-xl p-4 gap-4 bg-card-light dark:bg-card-dark flex-shrink-0">
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  data-alt="Store logo for 'Fashion Forward'"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdxVDdqdPHFEJjDVt-3pjnx5yPX-vf98IbKqyTqR1iGF_ZLz9rAb6hnVpmzw-xTOULz8QAQciT4DGVtd9Cn748Q_XdyQw72qtGkilS4omqcqM29zeh_UyQis77-oYoJmhPDQKSgitE6vcjpj2pZdrNa28Ou2rDCnzhSFB6xSGiITmDe5LJ4qiCADe1QNyh-Rn_dckC-eFo4_HIBJhA6_4x4NbE41bB4NlIDdlXiQDENX1G9_yME81aLx12ub1yjoJ0AWQzfkoWR_0"
                />
                <div className="flex flex-col">
                  <h4 className="font-bold text-text-light-primary dark:text-text-dark-primary">
                    Fashion Forward
                  </h4>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    Clothing
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-yellow-400 text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <p className="text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary">
                    4.8
                  </p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                  Visit
                </button>
              </div>
            </div>
            <div className="flex flex-col w-64 rounded-xl p-4 gap-4 bg-card-light dark:bg-card-dark flex-shrink-0">
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  data-alt="Store logo for 'Sole Mates'"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyKLfY2hJdPXe1FfDbnT_y4KxomGEEM7S4a3LCr17GTfUvC-EO1vc2nhzg5QQ8sd7zAYFycEXcFcDkUNTPhrmqQsRqErcdKz104e4xGwQF6jkO-MaLm3pHP7tEMBf8daC4YNAhje9zklxA3dM9hMCoNWB3tP7ubVqlNjd2B6dBI0OzR-_sTTSQIRG3a1ESye_Nj0m14b4Nww1KI3djKKgxDsp939X5B9rOEW5U8Zg8NiV6TtIzHf0ycsaIaLHYZ_7_TLI4zTHJ_do"
                />
                <div className="flex flex-col">
                  <h4 className="font-bold text-text-light-primary dark:text-text-dark-primary">
                    Sole Mates
                  </h4>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    Shoes
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-yellow-400 text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <p className="text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary">
                    4.9
                  </p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                  Visit
                </button>
              </div>
            </div>
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
            <div className="flex flex-col w-40 flex-shrink-0 gap-2">
              <div
                className="relative w-full aspect-square rounded-xl bg-cover bg-center"
                data-alt="Image of a modern trench coat"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2UJ3DJUxj9wpGcOOFDitNdHw3uKrJfCp4wiIQwIItsrLxrzNXcwDtjTsnDozlWXnr46rYuqu7H9Ho42_nOo8e3IF2g3635I0-oPDHlF_9drCq1ftjSB95fyGKbbLWg0We3oTUV9iab1eqqlbysd_RRsFesEsYk6d3jAGfAzs1qD6mDzLXFapnjYzFiNdPed8ZNjR-P26iB6jGi4bpCFZoHohGnUB9_1Vk0VOER9NZO298ICY-o21Rkj3jfxI_C7b_T_LdOz8VY7w")',
                }}
              >
                <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                  <span className="material-symbols-outlined text-text-light-primary text-xl">
                    favorite_border
                  </span>
                </button>
              </div>
              <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                Chic Boutique
              </p>
              <h4 className="font-semibold text-sm text-text-light-primary dark:text-text-dark-primary">
                Modern Trench Coat
              </h4>
              <p className="font-bold text-text-light-primary dark:text-text-dark-primary">
                $120.00
              </p>
            </div>
            <div className="flex flex-col w-40 flex-shrink-0 gap-2">
              <div
                className="relative w-full aspect-square rounded-xl bg-cover bg-center"
                data-alt="Image of urban sneakers"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuClsv3FonLiO77qFjofmorXocP7-zHCJUVV6ECNHdilum2n6LwDXXYYQmgYtJF1zNj8X6hiMgfW_ZIQTH3e7rpqU359EPJOhccUjQVXiGRVVaDJekE9k33EvDr5GpuFUkvVewy7_Vv0AhsI_pJgJn0N3mzuNEpN6uxi8TBM0W-p9AEyHOopMpDFf01ebeWGsLYnnWvtVNdLPNF_TlZi2y6QmNQs_ATyU7bFMfH3H3lP29U2hq_0zYlmg03I8_wX0sxh_DCYBuAfWTA")',
                }}
              >
                <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                  <span className="material-symbols-outlined text-text-light-primary text-xl">
                    favorite_border
                  </span>
                </button>
              </div>
              <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                Sole Mates
              </p>
              <h4 className="font-semibold text-sm text-text-light-primary dark:text-text-dark-primary">
                Urban Sneakers
              </h4>
              <p className="font-bold text-text-light-primary dark:text-text-dark-primary">
                $85.00
              </p>
            </div>
            <div className="flex flex-col w-40 flex-shrink-0 gap-2">
              <div
                className="relative w-full aspect-square rounded-xl bg-cover bg-center"
                data-alt="Image of a leather crossbody bag"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAPWVpgHeTehXqOow7AqPr0BDs4TpPWVfmYnYf8XPWf0A8rryyZ0HFdl8s69zTbvYoDB3njYTof6J6o6wbwcntIJDkYV2p2B_rp51U7VJO06T9riIX86LB30780797yGwpxiSH8NH0UIoXiqsc24lrJ7XnMFVXZ39tExUFzb8HhVAlK7eumuqj5We-LejS-zkKkv8VW-0xFujnE_wOZ5h2-fkQAGLEWzeAJATBpA0QRF0itU-fSFhwlJ1_58hRRH3VDI7MpRs7gxg4")',
                }}
              >
                <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-text-light-primary text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    favorite
                  </span>
                </button>
              </div>
              <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                Bags &amp; Co.
              </p>
              <h4 className="font-semibold text-sm text-text-light-primary dark:text-text-dark-primary">
                Leather Crossbody
              </h4>
              <p className="font-bold text-text-light-primary dark:text-text-dark-primary">
                $99.00
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center px-4 pb-4 z-50 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.1)]">
        <a className="flex flex-col items-center gap-1 text-[#1f431f] dark:text-white" href="#">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            home
          </span>
          <span className="text-xs font-bold">Home</span>
        </a>
        <a
          className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-[#1f431f] dark:hover:text-white transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined">widgets</span>
          <span className="text-xs font-medium">Categories</span>
        </a>
        <a
          className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-[#1f431f] dark:hover:text-white transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="text-xs font-medium">Cart</span>
        </a>
        <a
          className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-[#1f431f] dark:hover:text-white transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-xs font-medium">Profile</span>
        </a>
      </nav>
    </div>
  );
}
