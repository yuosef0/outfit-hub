'use client';

import Link from 'next/link';

export default function CustomerHome() {
  const categories = [
    { name: 'Clothing', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh0FGkmosPlESTAez7toDDNAYxLu9G6XjJaJD_7eodx9F00yugRYI1CniccQl92UCMUCX4c5hq8XxbvnEVfXOrEM-aXk1yCXgxTneNJXgyvIB-5FOXyEAKs43o9DfZxYJ8EZchD7ScK2Kwib_t6XZ-abQtC-rI8XYdRnvcuW0HqFCsR9dG5yVwhgdgVICNOlsQsi97FN0SxQJ1NXlNTpCONGxWgKHTxX3fFEbyaqsLmBZhWdbSIvcwrH2nSJRwB-Ug8D1-Z3Ubr1A' },
    { name: 'Shoes', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLZSM9zJ1L3m1rsenjDysQRDLMNCwlyRiu3Gq7JZWVrGznqqTT6n0j696Swk2pPKDtxoDWcuu2QRlXiFCKCtwu-wXz9Dj6NGgoOZ0zRXsTN4ibEPIaA9WBEdWjyA4F7loGTbIilW48xWjEjlp8JoAW4KrlHwjt-ILlWHyivjv4XrpKlA82YH0hyWD9FgkBQQkYB09CAJtElpGWReLSz2Rp8JMfblKW1m4NrGaiLCFLKwLwX7yNPEKCYkwEDqDF92yobpNdmRgrncE' },
    { name: 'Accessories', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaMqU0SQcGOPGwl0joR2LAzeL3LAr9jIkYfozeMDgqm0ZY_DA5Z1XaWUPenYeHbFHagXu45YIBSE_FsAHQv5bTu_orlYE5JneG67E62JQHrWwcjFLKeA03sonFLSG8L9yVmarKWQxe2kjWRZBG2FujyZ-s-BVdPvcgwCLpsThPhMDtjeCL13u_uuj0FvAq5pewqv2bYWGlD5uIx3YnwJzcX2emonHJwyj5euw1K-L7HMU4SRAGfMkfouHwIuS1Ht3hjmfeb7f3y2A' },
  ];

  const stores = [
    { name: 'Fashion Hub', rating: '4.5', reviews: '120', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUaNZjUCPeA4HEQfaWg7NC62ewS94Ixesfk7QT0hjcyDfv_8_riFQR7cNJ4O9CAlAxPAQkt6W8ObHbv4D8HpHvKGmTyOCUQ9Mv10G7tA6HopVeUEYLrKQXuC4yzgGm5uIqQLVM2hSWX8GEF_d8c8iB3_HhITjMhLXqGXGrnB82rZV2Fudt89e7LVIunwhyeISepgdhr8LgMwt1OS6QuF5B1YL1R0shKzDwUWLmoJYr6IAtr2NUd9cXbYs6k9PhZC8QHM4KwxWFXjo' },
    { name: 'Footwear Emporium', rating: '4.2', reviews: '85', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ92JDGlRH4MBOJxP_pTcWpxKslDaAFpjFdJ9QpFfX6FueQZxzI73wI23UtFUJqD5JNonXRVa9os1UqN2iTLmmcNMM6uaFyzxFI2oJMJCYXdYiYwSSHoYUPNUf2vzt_bMEbv0piVvmC2we5FuH2qn-U5QtD_KeQCFECWIxNgDiMBiqEv6LafOQHSy45BO_JEXKddz9_E3A9ieJO-tZO7XX76q8rmLTYhKEq1q2a_IN2y6vwHOXjTsqK9R9uXYO_u-GBiBI5j9wq4U' },
    { name: 'Accessory Haven', rating: '4.8', reviews: '150', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQQxedAx8M4BMdIUclm1ysr3wrGPV9iWYVdJNiYQLJSRrWz4oEXBRQyTZSDs6KZJ-aifKAABKl2bUzpZoK1EEDE0K_GqcGLyFhyZCeCNDJQgmmKWT6s9yzedTz1ymqYfbqPZ4R3vb1XdFgqPjOUtesW8S9K_pC8WH1swbsjP3NT6HI5AGp45V4AOjsgM4y2NBrGypBzAgG9Iy73ds8JnY4_nUw3Yha173TzQXLVkEDvPRtS9XL6K1z76fnAfxCxYqSzVyFg_pi7N4' },
  ];

  const products = [
    { name: 'Summer Dress', price: '$49.99', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY3K-7ZiFN3HM6a0p4WOKy_R-nh7sn1maftImj9z8tXFOz5IQ_mdo0hI_zfqf2ksz3YtWwpenNllZt_C1joxeeNqvsQxTfgS3ZJR4vciqei2n_9qigw88L7EFSnW-eFTERnTB-YpDfM8p5ba9dmla4xhIrtitIHMNVt61mMAddN8JrOcSXAmjCXxXEAYmcgd9rXl6lLNI069yPSzeweZ1sUQIDtcJAp7rP_jmRppSL2CaPqC1_hpvex_e4p_0N9wyO0VRRijQrii0' },
    { name: 'Leather Sandals', price: '$39.99', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA_MtAtDD3q7H1SUxhUdghwUzTNlpwtlPgBlXDdzG2z42749Ul1iE9UtZBZGVJ40A-pWv4nyYtL8ZK1zgiqPXP7r65Scui3-jrfQO539pDLbplL_sC0R0Ohckp-tXvZEjKgBa1lpR9CfpWiD_R7b_FMYPnTyyDGsScvUuzuVIDjZ0SspTNKyzuWZUMt0WDuLu-qMTwY_2JBdnhF1sF_Ti-Za4Wc52JBnPDI2aCcIBGvruKi_Oym0LNGwiuC1m-cPd3_XWnPEcBGio' },
    { name: 'Statement Necklace', price: '$29.99', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD31Tlj6_oHZd3YHt9IJv-R-X8nWCltUBpz2ORBAOeOuWaaFB9fWMABIGD4sG81H-0ay0GN2y3rjPQL3JuOrWEITVH6iO4KORY2eTMXgfO-xaZS4zPENiw_I--OXCh8wmxXxTkWHjpoE4OYVzcCPHGz3spWI3UswwLCAHzVyXwikk_U6peZUL8_JXplH0SUQr_HD4lo0cBLc3J0K__V-vItB5oOYdGO56_oJnOFTgb_Zn3VuJlAPPPErXAn2C5CklgASib-nyPQh4I' },
    { name: 'Casual Shirt', price: '$34.99', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE1dwpj_Ed9AtWJAQJ4lf4vGf4b8FRIHbIaCJV-Ef8AevntPScVI4Er3Sb8VFZO6Cl8qsEzdwTo5qj2fMi1QCIAoLwDk5UhFIx4JJLfQQmFVCJOlSl_PSD2m8Tj6eLNQV_j4WVwXevTL8LQ0wEyjEKiCQFgTPI-9A9ub-JZfgS80EJVv5688o5CarulZBNT9ez65qNHtu-PNehDoMRC2Uq4FIAtuQWhcigyep6yOGSEmWh4m1HSdIqVwCvhxliO7RXazyxJvG6pUg' },
    { name: 'Running Shoes', price: '$79.99', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAxe2rBkWCzYa-s0PDu8d8aPBFhk4M9mtm6xcTguTkXGDzeSyZwdbPdA50c9OsJhUQwsocFBpgOxiw0wiIz6O6dcuC_EBELbAnkEtiETRPWIJixFLn9ESYNgvX1M9tw-3eGJDCov1w7B5TbNoxSIHc-uOPeBG1uTyPnj0d7TxFc7_OBQryTXy6-6CNGKw5td5aDzFi4XkVhgVl78K0h7WNikGPosVPD1f6E6QD6AJjO5FK52uxYSP3tGSpl9FInijZI_9VWjRYTUs' },
    { name: 'Stylish Backpack', price: '$59.99', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2iFMfECdlkxNf1IB3ny2_j-OziuHOUN5khH2Vy_SAgx7QwwleR33b3cQMBMB53BwOGM3rLMYWOTx9i-sw6m_Asuog0fPkqJBcTiDOWglvahRpP0NVwMxPOavact2E8B3K8pDBnw7lAi2tVv9V-a1b_mtGfrAzRW7BPzXouFjjEEST2OjlIu2gA8aKk9aQd8VvwjE-yOVPdIFb0HZ8ZqYDN-lV5aIKptaUmYbHyD7ge9jEdz4ndcODGmNe6ZGyMKgoX7RJ5RCPmLs' },
  ];

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-slate-50 justify-between overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center bg-slate-50 p-4 pb-2 justify-between">
          <div className="text-[#0d141b] flex size-12 shrink-0 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
            </svg>
          </div>
          <h2 className="text-[#0d141b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Modern Mall</h2>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div className="text-[#4c739a] flex border-none bg-[#e7edf3] items-center justify-center pl-4 rounded-l-xl border-r-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <input
                placeholder="Search for products or stores"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141b] focus:outline-0 focus:ring-0 border-none bg-[#e7edf3] focus:border-none h-full placeholder:text-[#4c739a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              />
            </div>
          </label>
        </div>

        {/* Hero Banner */}
        <div className="@container">
          <div className="@[480px]:px-4 @[480px]:py-3">
            <div
              className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-slate-50 @[480px]:rounded-xl min-h-[218px]"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCw5nivGPYrZWcARh3zC1c4M4EV0erj_yXcnwuI8wQZI02tFJ4q1VmK4C4pdGm4dR5RzPIXo8GJwrCmso6bgC_koxwT9ejvXt04jTwIb-ulbn_nWH0t-VEcscxpN6SbRNP7Ka6GMNXz3XfWnj1WBPetENxGEodJ2qT40pPFFZvBK2cAYvJaNsgCqHKRgcLR6IMZImJ_6t3XY6XQiKOnV2kdyOk5w5NTm3Cf6nkY_N4QucWWlb2C7pdXUISy8c6og_sL0NKXigdn0wY")`
              }}
            >
              <div className="flex justify-center gap-2 p-5">
                <div className="size-1.5 rounded-full bg-slate-50"></div>
                <div className="size-1.5 rounded-full bg-slate-50 opacity-50"></div>
                <div className="size-1.5 rounded-full bg-slate-50 opacity-50"></div>
                <div className="size-1.5 rounded-full bg-slate-50 opacity-50"></div>
                <div className="size-1.5 rounded-full bg-slate-50 opacity-50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <h3 className="text-[#0d141b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Categories</h3>
        <div className="flex overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-stretch p-4 gap-8">
            {categories.map((category) => (
              <div key={category.name} className="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-32 pt-4">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"
                  style={{ backgroundImage: `url("${category.image}")` }}
                ></div>
                <p className="text-[#0d141b] text-base font-medium leading-normal">{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Stores */}
        <h3 className="text-[#0d141b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Featured Stores</h3>
        <div className="flex overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-stretch p-4 gap-3">
            {stores.map((store) => (
              <div key={store.name} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col"
                  style={{ backgroundImage: `url("${store.image}")` }}
                ></div>
                <div>
                  <p className="text-[#0d141b] text-base font-medium leading-normal">{store.name}</p>
                  <p className="text-[#4c739a] text-sm font-normal leading-normal">{store.rating} • {store.reviews} reviews</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Arrivals */}
        <h3 className="text-[#0d141b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">New Arrivals</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          {products.map((product) => (
            <div key={product.name} className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl"
                style={{ backgroundImage: `url("${product.image}")` }}
              ></div>
              <div>
                <p className="text-[#0d141b] text-base font-medium leading-normal">{product.name}</p>
                <p className="text-[#4c739a] text-sm font-normal leading-normal">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div>
        <div className="flex gap-2 border-t border-[#e7edf3] bg-slate-50 px-4 pb-3 pt-2">
          <Link className="flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#0d141b]" href="/">
            <div className="text-[#0d141b] flex h-8 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
              </svg>
            </div>
            <p className="text-[#0d141b] text-xs font-medium leading-normal tracking-[0.015em]">Home</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center justify-end gap-1 text-[#4c739a]" href="/stores">
            <div className="text-[#4c739a] flex h-8 items-center justify-center">
              <span className="material-symbols-outlined text-2xl">storefront</span>
            </div>
            <p className="text-[#4c739a] text-xs font-medium leading-normal tracking-[0.015em]">Stores</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center justify-end gap-1 text-[#4c739a]" href="/cart">
            <div className="text-[#4c739a] flex h-8 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path>
              </svg>
            </div>
            <p className="text-[#4c739a] text-xs font-medium leading-normal tracking-[0.015em]">Cart</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center justify-end gap-1 text-[#4c739a]" href="/saved">
            <div className="text-[#4c739a] flex h-8 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"></path>
              </svg>
            </div>
            <p className="text-[#4c739a] text-xs font-medium leading-normal tracking-[0.015em]">Wishlist</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center justify-end gap-1 text-[#4c739a]" href="/profile">
            <div className="text-[#4c739a] flex h-8 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
              </svg>
            </div>
            <p className="text-[#4c739a] text-xs font-medium leading-normal tracking-[0.015em]">Profile</p>
          </Link>
        </div>
        <div className="h-5 bg-slate-50"></div>
      </div>
    </div>
  );
}
