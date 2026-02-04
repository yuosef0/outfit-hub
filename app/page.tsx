'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SearchModal } from '@/components/SearchModal';

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="pb-24">
        <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between">
          <div className="text-[#0d141b] dark:text-white flex size-12 shrink-0 items-center" data-icon="MapPin" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path
                d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"
              ></path>
            </svg>
          </div>
          <h2 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Modern Mall</h2>
        </div>
        <div className="px-4 py-3">
          <div onClick={() => setIsSearchOpen(true)} className="flex flex-col min-w-40 h-12 w-full cursor-pointer">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div
                className="text-gray-400 dark:text-gray-500 flex border-none bg-surface-light dark:bg-surface-dark items-center justify-center pl-4 rounded-l-xl border-r-0"
                data-icon="MagnifyingGlass"
                data-size="24px"
                data-weight="regular"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <input
                placeholder="Search for products or stores"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141b] dark:text-white focus:outline-0 focus:ring-0 border-none bg-surface-light dark:bg-surface-dark focus:border-none h-full placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal cursor-pointer"
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="@container">
          <div className="@[480px]:px-4 @[480px]:py-3">
            <div
              className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-background-light dark:bg-background-dark @[480px]:rounded-xl min-h-[218px]"
              style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCw5nivGPYrZWcARh3zC1c4M4EV0erj_yXcnwuI8wQZI02tFJ4q1VmK4C4pdGm4dR5RzPIXo8GJwrCmso6bgC_koxwT9ejvXt04jTwIb-ulbn_nWH0t-VEcscxpN6SbRNP7Ka6GMNXz3XfWnj1WBPetENxGEodJ2qT40pPFFZvBK2cAYvJaNsgCqHKRgcLR6IMZImJ_6t3XY6XQiKOnV2kdyOk5w5NTm3Cf6nkY_N4QucWWlb2C7pdXUISy8c6og_sL0NKXigdn0wY")' }}
            >
              <div className="flex justify-center gap-2 p-5">
                <div className="size-1.5 rounded-full bg-white"></div>
                <div className="size-1.5 rounded-full bg-white opacity-50"></div>
                <div className="size-1.5 rounded-full bg-white opacity-50"></div>
                <div className="size-1.5 rounded-full bg-white opacity-50"></div>
                <div className="size-1.5 rounded-full bg-white opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Categories</h3>
        <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-stretch p-4 gap-8">
            <div className="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-32 pt-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCh0FGkmosPlESTAez7toDDNAYxLu9G6XjJaJD_7eodx9F00yugRYI1CniccQl92UCMUCX4c5hq8XxbvnEVfXOrEM-aXk1yCXgxTneNJXgyvIB-5FOXyEAKs43o9DfZxYJ8EZchD7ScK2Kwib_t6XZ-abQtC-rI8XYdRnvcuW0HqFCsR9dG5yVwhgdgVICNOlsQsi97FN0SxQJ1NXlNTpCONGxWgKHTxX3fFEbyaqsLmBZhWdbSIvcwrH2nSJRwB-Ug8D1-Z3Ubr1A")' }}
              ></div>
              <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Clothing</p>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-32 pt-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDLZSM9zJ1L3m1rsenjDysQRDLMNCwlyRiu3Gq7JZWVrGznqqTT6n0j696Swk2pPKDtxoDWcuu2QRlXiFCKCtwu-wXz9Dj6NGgoOZ0zRXsTN4ibEPIaA9WBEdWjyA4F7loGTbIilW48xWjEjlp8JoAW4KrlHwjt-ILlWHyivjv4XrpKlA82YH0hyWD9FgkBQQkYB09CAJtElpGWReLSz2Rp8JMfblKW1m4NrGaiLCFLKwLwX7yNPEKCYkwEDqDF92yobpNdmRgrncE")' }}
              ></div>
              <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Shoes</p>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-32 pt-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBaMqU0SQcGOPGwl0joR2LAzeL3LAr9jIkYfozeMDgqm0ZY_DA5Z1XaWUPenYeHbFHagXu45YIBSE_FsAHQv5bTu_orlYE5JneG67E62JQHrWwcjFLKeA03sonFLSG8L9yVmarKWQxe2kjWRZBG2FujyZ-s-BVdPvcgwCLpsThPhMDtjeCL13u_uuj0FvAq5pewqv2bYWGlD5uIx3YnwJzcX2emonHJwyj5euw1K-L7HMU4SRAGfMkfouHwIuS1Ht3hjmfeb7f3y2A")' }}
              ></div>
              <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Accessories</p>
            </div>
          </div>
        </div>
        <h3 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Featured Stores</h3>
        <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-stretch p-4 gap-3">
            <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCUaNZjUCPeA4HEQfaWg7NC62ewS94Ixesfk7QT0hjcyDfv_8_riFQR7cNJ4O9CAlAxPAQkt6W8ObHbv4D8HpHvKGmTyOCUQ9Mv10G7tA6HopVeUEYLrKQXuC4yzgGm5uIqQLVM2hSWX8GEF_d8c8iB3_HhITjMhLXqGXGrnB82rZV2Fudt89e7LVIunwhyeISepgdhr8LgMwt1OS6QuF5B1YL1R0shKzDwUWLmoJYr6IAtr2NUd9cXbYs6k9PhZC8QHM4KwxWFXjo")' }}
              ></div>
              <div>
                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Fashion Hub</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">4.5 • 120 reviews</p>
              </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAJ92JDGlRH4MBOJxP_pTcWpxKslDaAFpjFdJ9QpFfX6FueQZxzI73wI23UtFUJqD5JNonXRVa9os1UqN2iTLmmcNMM6uaFyzxFI2oJMJCYXdYiYwSSHoYUPNUf2vzt_bMEbv0piVvmC2we5FuH2qn-U5QtD_KeQCFECWIxNgDiMBiqEv6LafOQHSy45BO_JEXKddz9_E3A9ieJO-tZO7XX76q8rmLTYhKEq1q2a_IN2y6vwHOXjTsqK9R9uXYO_u-GBiBI5j9wq4U")' }}
              ></div>
              <div>
                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Footwear Emporium</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">4.2 • 85 reviews</p>
              </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQQxedAx8M4BMdIUclm1ysr3wrGPV9iWYVdJNiYQLJSRrWz4oEXBRQyTZSDs6KZJ-aifKAABKl2bUzpZoK1EEDE0K_GqcGLyFhyZCeCNDJQgmmKWT6s9yzedTz1ymqYfbqPZ4R3vb1XdFgqPjOUtesW8S9K_pC8WH1swbsjP3NT6HI5AGp45V4AOjsgM4y2NBrGypBzAgG9Iy73ds8JnY4_nUw3Yha173TzQXLVkEDvPRtS9XL6K1z76fnAfxCxYqSzVyFg_pi7N4")' }}
              ></div>
              <div>
                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Accessory Haven</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">4.8 • 150 reviews</p>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">New Arrivals</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAY3K-7ZiFN3HM6a0p4WOKy_R-nh7sn1maftImj9z8tXFOz5IQ_mdo0hI_zfqf2ksz3YtWwpenNllZt_C1joxeeNqvsQxTfgS3ZJR4vciqei2n_9qigw88L7EFSnW-eFTERnTB-YpDfM8p5ba9dmla4xhIrtitIHMNVt61mMAddN8JrOcSXAmjCXxXEAYmcgd9rXl6lLNI069yPSzeweZ1sUQIDtcJAp7rP_jmRppSL2CaPqC1_hpvex_e4p_0N9wyO0VRRijQrii0")' }}
            ></div>
            <div>
              <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Summer Dress</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">$49.99</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAA_MtAtDD3q7H1SUxhUdghwUzTNlpwtlPgBlXDdzG2z42749Ul1iE9UtZBZGVJ40A-pWv4nyYtL8ZK1zgiqPXP7r65Scui3-jrfQO539pDLbplL_sC0R0Ohckp-tXvZEjKgBa1lpR9CfpWiD_R7b_FMYPnTyyDGsScvUuzuVIDjZ0SspTNKyzuWZUMt0WDuLu-qMTwY_2JBdnhF1sF_Ti-Za4Wc52JBnPDI2aCcIBGvruKi_Oym0LNGwiuC1m-cPd3_XWnPEcBGio")' }}
            ></div>
            <div>
              <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Leather Sandals</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">$39.99</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD31Tlj6_oHZd3YHt9IJv-R-X8nWCltUBpz2ORBAOeOuWaaFB9fWMABIGD4sG81H-0ay0GN2y3rjPQL3JuOrWEITVH6iO4KORY2eTMXgfO-xaZS4zPENiw_I--OXCh8wmxXxTkWHjpoE4OYVzcCPHGz3spWI3UswwLCAHzVyXwikk_U6peZUL8_JXplH0SUQr_HD4lo0cBLc3J0K__V-vItB5oOYdGO56_oJnOFTgb_Zn3VuJlAPPPErXAn2C5CklgASib-nyPQh4I")' }}
            ></div>
            <div>
              <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Statement Necklace</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">$29.99</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAE1dwpj_Ed9AtWJAQJ4lf4vGf4b8FRIHbIaCJV-Ef8AevntPScVI4Er3Sb8VFZO6Cl8qsEzdwTo5qj2fMi1QCIAoLwDk5UhFIx4JJLfQQmFVCJOlSl_PSD2m8Tj6eLNQV_j4WVwXevTL8LQ0wEyjEKiCQFgTPI-9A9ub-JZfgS80EJVv5688o5CarulZBNT9ez65qNHtu-PNehDoMRC2Uq4FIAtuQWhcigyep6yOGSEmWh4m1HSdIqVwCvhxliO7RXazyxJvG6pUg")' }}
            ></div>
            <div>
              <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Casual Shirt</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">$34.99</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAxe2rBkWCzYa-s0PDu8d8aPBFhk4M9mtm6xcTguTkXGDzeSyZwdbPdA50c9OsJhUQwsocFBpgOxiw0wiIz6O6dcuC_EBELbAnkEtiETRPWIJixFLn9ESYNgvX1M9tw-3eGJDCov1w7B5TbNoxSIHc-uOPeBG1uTyPnj0d7TxFc7_OBQryTXy6-6CNGKw5td5aDzFi4XkVhgVl78K0h7WNikGPosVPD1f6E6QD6AJjO5FK52uxYSP3tGSpl9FInijZI_9VWjRYTUs")' }}
            ></div>
            <div>
              <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Running Shoes</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">$79.99</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD2iFMfECdlkxNf1IB3ny2_j-OziuHOUN5khH2Vy_SAgx7QwwleR33b3cQMBMB53BwOGM3rLMYWOTx9i-sw6m_Asuog0fPkqJBcTiDOWglvahRpP0NVwMxPOavact2E8B3K8pDBnw7lAi2tVv9V-a1b_mtGfrAzRW7BPzXouFjjEEST2OjlIu2gA8aKk9aQd8VvwjE-yOVPdIFb0HZ8ZqYDN-lV5aIKptaUmYbHyD7ge9jEdz4ndcODGmNe6ZGyMKgoX7RJ5RCPmLs")' }}
            ></div>
            <div>
              <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Stylish Backpack</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">$59.99</p>
            </div>
          </div>
        </div>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
