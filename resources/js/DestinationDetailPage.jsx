import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const defaultDestination = {
    id: 3,
    title: 'Pantai Tanjung Bira',
    region: 'Kabupaten Bulukumba',
    price: 'Rp 15.000',
    // Koordinat GPS destinasi (latitude, longitude)
    coordinates: { lat: -5.6115, lng: 120.4517 },
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUTVhvZCVJWq50LCBJCAadwd0z5OTe6BkSnIZNHDsunkSyU6W1Ws93mQl75e_Cnk8xXqGXB8ZpFBxP3eyvZj12Ji7Y2hbo1SNAxTIwlzRWuZgDS2lQ19IRDxjAjPXOrIaWDTXUNxRViokDHLscyYeX5tdzc34KJJewgFwDyKcLnKcKM60i3fvdWqYJveMPlNc-UFXzi8iRjDniwugRltBH8cQiKaFPpPpK73y1h5RNcipB3k4ICFcmKHyzZypTr-SyVvKHU-EncqE',
    aboutParagraphs: [
        'Terletak di ujung selatan Pulau Sulawesi, Pantai Tanjung Bira adalah mahakarya alam yang memadukan pasir putih selembut tepung dengan gradasi air laut dari bening kristal hingga biru safir yang dalam. Dikenal secara internasional sebagai rumah bagi para pengrajin kapal Phinisi yang legendaris, kawasan ini menawarkan lebih dari sekadar pemandangan—ini adalah perjalanan ke jantung budaya maritim Sulawesi.',
        'Pengunjung dapat menikmati snorkeling di lepas pantai untuk melihat penyu laut, atau sekadar bersantai di bawah pohon kelapa sambil menyaksikan matahari terbenam yang membasahi langit dengan warna jingga terbakar. Akses yang semakin baik menjadikannya destinasi wajib bagi mereka yang mencari kemewahan yang tenang dan autentik.'
    ],
    keindahanAlam: 'Pantai Tanjung Bira adalah simfoni alam yang memukau, di mana air laut kristal bertemu dengan hamparan pasir putih selembut tepung yang membentang luas. Kejernihan airnya memungkinkan Anda melihat keindahan terumbu karang dan kehidupan laut yang kaya bahkan dari permukaan, menciptakan gradasi warna biru yang menghipnotis setiap mata yang memandang.',
    warisanBudaya: {
        text: 'Tanjung Bira bukan sekadar destinasi wisata, melainkan pusat peradaban maritim Nusantara. Di sinilah tradisi pembuatan kapal Phinisi yang legendaris tetap hidup, diwariskan secara turun-temurun oleh para pengrajin Bugis-Makassar. Menyaksikan proses pembuatan kapal kayu raksasa tanpa paku modern adalah pengalaman spiritual yang menghubungkan kita dengan kejayaan pelaut masa lalu.',
        quote: 'Setiap pasak kayu adalah doa, setiap sambungan adalah janji kepada laut.',
        image1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3eZ-fa7mueito91akSt22MxT6c-vfU1SpegZLZnKAfDeNgLa4-6Q618D0GhY2Rv7jlJ85DQkoSZeP1BczTvl3BsF_Ev55whnuZWNVhbDNTLdzjq8knbTQ1fpglqqU_-Ragh7AqLJCdTMG7pDvGcIubNyQ2IfqEJzbcEp4xch9f8UyQV0P19N4wkwcxBHlVAevEiJLU0t_HPaV1dNXh6zJPG1L6aAtHbA97rFqhNNohSKWPyCZMl0L_xgJyCv6780vVQt25UNHQl4',
        image2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsisT4NSGo0DicRk-3-WFrFERwuMY8VLQ01J0Rlt_7O3_B6an79iWA5CkqyReU9e9gQ0KOzaoP-l-dd9eAjGj7R98yJTg6nVqOzx1Ofo-LAixQkk0qwhD5Osa1h9vC3jxzc9w_exekLuvNulqf11lBlZn2BHsPjOFIOsU_ezYw56K_I8xLwI_62ZnEul_QIiaUgiMpePpEgRJtSYxX0gwefFNZuzOtysq86iVRxizD3gE1r--5fhUvNeflca7DnEfJZppL8C1PUaI'
    },
    facilities: [
        { icon: '🅿️', label: 'Parkir Luas' },
        { icon: '🚿', label: 'Toilet & Bilas' },
        { icon: '🕌', label: 'Musholla' },
        { icon: '☕', label: 'Cafe & Resto' },
        { icon: '🚤', label: 'Sewa Speedboat' }
    ],
    gallery: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBGPoA__DoHtGYacKqjDs60k-vMX2F6j75VZnJ95qsm5Q42FUdokRXbqsMFUEhdt25YTwYB0E-ga2cVznJSnsTdAfdhXiDD99WeTcpKLuvV5YkhKsBG11lnGfQneWxg3P-or2dzi8AyQ5EDKIpcW1Xw2Ujf4ZeSEkDbkCC1dl4XcBoOIu554RosFWXojq0dQvYrlWeGQU4aQrXGt_yEfAxttUSLv60dnP2KF45Rky1Gd8RQ-hcDvba_thdGZyWcJVgORSyJ-GWUMz8',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCrqVp3GEPhzTT3GjPPXtUu6BJauTwZSJih3ElVf7SwvW4qeIZ0WCjAlOBgVLPtGB7aY6fxhSmKk0M-ctYbf2_1dmRSG8zjELphuwnCR8RWtqFM2QYK-0zWUvU_atA9bJk16rM0iRiawhcz8oxdSXEhnxfPj9QH9zO4lHdjNQ_Cx4tunOL8Lo9hqDLBQ1dHzu9oifnMnXdIWcPFvyxzKNgSZ7hg5LzNlLJ7vj9EnglArlSbOoJIEnA-hJmAzpdUxngIBmXTqYso9Ys',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC06vxx8n9QAv7Okdtcpv_2b3QCqHfKcNfiCVro5BD9crqOBHEVRgQB8olu3T2p2o4U3renEgHLGngKDhxYJrLV8JEokiOf_hOUs_DBn47xcVD57Z-U09-DNLtE0s4z2ntKPjBlaWyP-fjj7G-FOlLvddPlN-Tkz9VhlYo_uDvZ0nSlSAAXXUkA4ruN86kvjv8ZxV7atxloELRbG0unjUU_QKKhR0LbhhcjmVO7qCLb_2-vBQle9J_jSOn2yk15TImm84WSBfNdjrM',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDaRsx0dpPB7_KYQSJQ5xkAdtDpsyqG9IEW4ejN7yJnJmvrW2JBqoyCGAAPSi8CNeBfQB0OaLsMmh_t4PC19HB-LLNi9cc0RlLkm1h3D3IpwZLwhbCviY6FuBaMhYO5pcYK678NxSeXxkc5-w_vrd18RNq5IjOJf8GeCoTWgGy0PgpfPV9HvA8uaBVm7OmCa7N-kZKPD02OvJVCFP6i4YTN938TIYL58LHmRxhp4Eb4kRedVWfDSfj4SJ66Iw24hnT1kAMW55Pbvws',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAYjdrABBF0I7j_00FjyI0vLrI_fjcR92Lde5R_I8Ll7tM_Anv1uVdxAHs1NzdcYCCpjiGGU2KtK7ve7SMsMfdrI9nKnKvVibaHr_QeqXKG9INDhsUYG1SMkjKCDHgzRaWPB-NQe5X2z0WoGX6zhaKmrVvyv51SUk1Xu4Qa41zmhdRdXZKbdo7Jpun0vyRWYYomt5HO0zmVa6vB3ux3anY53rOe24nNAjSSoJzK2gKC2dbUsYf-lbFf62dXO_WzW0kUYNRL0_oym5g'
    ],
    accommodations: [
        {
            name: 'Bira Highland',
            rating: '4.8',
            price: 'Rp 1.200.000',
            bg: 'linear-gradient(135deg, #2D4A42 0%, #006b5e 100%)'
        },
        {
            name: 'Cosmos Bungalows',
            rating: '4.5',
            price: 'Rp 650.000',
            bg: 'linear-gradient(135deg, #006b5e 0%, #23F7DB 100%)'
        },
        {
            name: 'Hakuna Matata',
            rating: '4.7',
            price: 'Rp 950.000',
            bg: 'linear-gradient(135deg, #b32000 0%, #F5401B 100%)'
        }
    ],
    stayGrid: [
        {
            name: 'Amatoa Resort',
            type: 'Resort',
            desc: 'Cliffside luxury with direct ocean access.',
            price: 'Rp 2.150.000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKhYb9RpBN3Xgg82SHZhXxYxKmLoEhIN7OJg0t8xpM4Q8x4pxs__fSQtZqo3Gi6oGoiHFFZgKv6La_RJZ270rPlJvcvpov-ZxgbaCX_Z6vhyrJGnn9s-_n8IsO2asauMD5YdT0Mty1L2RGhBWVvKxgxRmoCQfwNfWk0g9QDx4Ix9KkBn6kWixyxlXop2gGsZlUmG3qbIdDT6B0wG3QjiK-9ybow8ZH_zEfNjbz-WklkHSNGtDmoe4R87lqnqybemoNelFkJIwadu0'
        },
        {
            name: 'Teppo Resort',
            type: 'Boutique Hotel',
            desc: 'Modern amenities with authentic Sulawesi charm.',
            price: 'Rp 850.000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAohpzFdK14RZV6qoGxwoCa8OPijVfY-iZyGSW8wybLWwTFWJMklly0Fu-ikvHLRjjmZPNXDC3a3kX21gm8_bx_XqrC7fqHOXsPBrF7Gi_7xfx16cLMAqex1eQm9zYSoj_OdPUIbybi0sDDasZpFn13U8xGcD1FHVLsW55j6-PeaCyKTi2DkrIw5F7UQsyAVpWFRxgNL9hBcr3Ut6todAQH1sFH_zLg8GwP1YoGq6XnTRBeBzeoN9RzLTF2DtVGkiEmY_mcmGTgF7c'
        }
    ],
    sidebarInfo: {
        jamOperasional: 'Setiap Hari (24 Jam)',
        waktuTerbaik: 'Mei — September',
        jarakMakassar: '± 190 KM (4-5 Jam)',
        weatherStatus: 'CERAH',
        weatherTemp: '31°C'
    }
};

const otherDestinationsData = {
    1: {
        title: 'Kete Kesu Village',
        region: 'Kabupaten Toraja Utara',
        price: 'Rp 20.000',
        // Koordinat GPS destinasi
        coordinates: { lat: -2.9753, lng: 119.8893 },
        heroImage: 'https://lh3.googleusercontent.com/aida/AP1WRLvYeqrFdeRQkI8xbVEV6cMH7JOrbWRCkKLeIokvPZjE3C0Rt_Cpuu3EZPPXZHSP7NsyDJwqYBq3xbfpC8Evsj0zfYM91C0K5nH4gw3ztbX_7uTlLtptZ3KwNsdnihGdbwh05dY1uyPEOcY6ca540N0pzwYFAVw4hUU6ZBGRyeHPPA6Ga7Az_KCbMemzLl4yZmriqjNNRYNroAv0eayLwsKeh64oiv8hBdxp5OKmFkxK-2CAyjsmbB7FEQ',
        aboutParagraphs: [
            'Ke\'te\' Kesu\' adalah sebuah desa adat di Kabupaten Toraja Utara, Sulawesi Selatan, Indonesia. Terkenal dengan deretan rumah adat tongkonan yang megah berumur ratusan tahun serta lumbung padi tradisional (alang). Desa ini juga memiliki situs makam tebing kuno berumur ratusan tahun yang menjadi simbol peradaban megalitik leluhur Toraja.',
            'Kawasan Ke\'te\' Kesu\' diakui sebagai salah satu desa budaya tertua di nusantara yang masih memegang teguh hukum adat dan ritual pemakaman Rambu Solo yang spektakuler. Di sini pengunjung diajak meresapi spiritualitas leluhur berpadu keelokan alam pegunungan Toraja.'
        ],
        keindahanAlam: 'Terletak di lembah hijau berlatar tebing bukit kapur purba, Ke\'te\' Kesu\' menyuguhkan pemandangan sawah berundak yang hijau berkabut. Udara pegunungan yang sejuk di ketinggian Toraja dipadukan dengan pemandangan mistis makam gantung gua alam di bukit batu.',
        warisanBudaya: {
            text: 'Tongkonan di Ke\'te\' Kesu\' dihiasi ukiran kayu khas Toraja bernilai seni tinggi, menceritakan strata sosial, sejarah klan, dan filsafat hidup harmonis manusia. Prosesi adat Toraja dan keahlian memahat kayu tanpa paku modern adalah bukti kecerdasan arsitektur luhur nusantara.',
            quote: 'Rumah adalah cerminan keluarga, tanduk kerbau adalah penanda kehormatan di bawah langit Toraja.',
            image1: 'https://lh3.googleusercontent.com/aida/AP1WRLvYeqrFdeRQkI8xbVEV6cMH7JOrbWRCkKLeIokvPZjE3C0Rt_Cpuu3EZPPXZHSP7NsyDJwqYBq3xbfpC8Evsj0zfYM91C0K5nH4gw3ztbX_7uTlLtptZ3KwNsdnihGdbwh05dY1uyPEOcY6ca540N0pzwYFAVw4hUU6ZBGRyeHPPA6Ga7Az_KCbMemzLl4yZmriqjNNRYNroAv0eayLwsKeh64oiv8hBdxp5OKmFkxK-2CAyjsmbB7FEQ',
            image2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2tpd489SCZCN7osEY1vPx5f5LQF0gN9GRwcwNfsNvGhpFHBhJ3FT3qBSA6KRK91qtPCi2GPbIw2eJ1DqIges9EBOg0qPttMYeH_KJgeznyFTeuH36Pdab31tHRTqkaIp2Gi81qLeKhrdljbU0RsGCLKqNaBdiqh2zA0gNn3BWCaqm_K6m_aoNGvGj-jQfI1ZsxhYrvMAXrUUHQ6w2gyj8Hkuh2h1F_eEkGcQs5EQsMta0KRvsjHYZo3-UtY1GTsfvfp8WQ2jPbsI'
        },
        facilities: [
            { icon: '🅿️', label: 'Parkir Area' },
            { icon: '🚿', label: 'Toilet Umum' },
            { icon: '🕌', label: 'Musholla' },
            { icon: '🎨', label: 'Pusat Kerajinan' },
            { icon: '🍵', label: 'Warung Kopi Toraja' }
        ],
        gallery: [
            'https://lh3.googleusercontent.com/aida/AP1WRLvYeqrFdeRQkI8xbVEV6cMH7JOrbWRCkKLeIokvPZjE3C0Rt_Cpuu3EZPPXZHSP7NsyDJwqYBq3xbfpC8Evsj0zfYM91C0K5nH4gw3ztbX_7uTlLtptZ3KwNsdnihGdbwh05dY1uyPEOcY6ca540N0pzwYFAVw4hUU6ZBGRyeHPPA6Ga7Az_KCbMemzLl4yZmriqjNNRYNroAv0eayLwsKeh64oiv8hBdxp5OKmFkxK-2CAyjsmbB7FEQ',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD2tpd489SCZCN7osEY1vPx5f5LQF0gN9GRwcwNfsNvGhpFHBhJ3FT3qBSA6KRK91qtPCi2GPbIw2eJ1DqIges9EBOg0qPttMYeH_KJgeznyFTeuH36Pdab31tHRTqkaIp2Gi81qLeKhrdljbU0RsGCLKqNaBdiqh2zA0gNn3BWCaqm_K6m_aoNGvGj-jQfI1ZsxhYrvMAXrUUHQ6w2gyj8Hkuh2h1F_eEkGcQs5EQsMta0KRvsjHYZo3-UtY1GTsfvfp8WQ2jPbsI',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCc6KtwA3DqtQmGNYT0zf93pd0fulPEMYOz_WmFoXw70YEwqC6MWXhKMarSvYnWjjcRtSH3n1JfH_3yGCFhsKQlCYFz2q-D7rOqZehIqPKRj9Yv3WZyEJj1cXXfhgEKILTc1GheVjUE-aqOLi91YN4kouhd1WrRSQwe3LpV9Z-W7cm2Yiutz83ugleIhCzOHN7hf-nn9awE65vE_D5xafr1VDgMmA8xqKiV0_blNcKvds7DXEDhzJ24fMk3F9qOAs-i94_6l4kdnI8',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBAChlvmSARo8RJAp3UQjOtUYXO3LwvQFPmO1yjxfzhSuc96U7Qk-H01XARKly92BGXRN_JYh9hrLbhcZ-XKySsBW6eL6f1VTua6Pj2n8l0TjMzQCe9PXBpEADX3zulC6RqA3NctBaTVxu3WYMVT6AVMgJ0jetiZw97rWH9pqDWgUOmk_FP8ueecdRgRMsNmG_Hjy3QnqbykOCi4zWKXUbYnxmzgzOtNjnviDsiwuRXGAzt4nldxDqm8ZKqxdrxOj74LqqHolEvBzc',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDaRsx0dpPB7_KYQSJQ5xkAdtDpsyqG9IEW4ejN7yJnJmvrW2JBqoyCGAAPSi8CNeBfQB0OaLsMmh_t4PC19HB-LLNi9cc0RlLkm1h3D3IpwZLwhbCviY6FuBaMhYO5pcYK678NxSeXxkc5-w_vrd18RNq5IjOJf8GeCoTWgGy0PgpfPV9HvA8uaBVm7OmCa7N-kZKPD02OvJVCFP6i4YTN938TIYL58LHmRxhp4Eb4kRedVWfDSfj4SJ66Iw24hnT1kAMW55Pbvws'
        ],
        accommodations: [
            { name: 'Lolai High Resort', rating: '4.7', price: 'Rp 1.100.000', bg: 'linear-gradient(135deg, #2D4A42 0%, #006b5e 100%)' },
            { name: 'Toraja Heritage Hotel', rating: '4.8', price: 'Rp 1.450.000', bg: 'linear-gradient(135deg, #b32000 0%, #F5401B 100%)' },
            { name: 'Tongkonan Homestay', rating: '4.4', price: 'Rp 300.000', bg: 'linear-gradient(135deg, #006b5e 0%, #23F7DB 100%)' }
        ],
        stayGrid: [
            { name: 'Toraja Heritage Resort', type: 'Heritage Resort', desc: 'Arsitektur tongkonan berpadu kemewahan modern.', price: 'Rp 1.500.000', image: 'https://lh3.googleusercontent.com/aida/AP1WRLvYeqrFdeRQkI8xbVEV6cMH7JOrbWRCkKLeIokvPZjE3C0Rt_Cpuu3EZPPXZHSP7NsyDJwqYBq3xbfpC8Evsj0zfYM91C0K5nH4gw3ztbX_7uTlLtptZ3KwNsdnihGdbwh05dY1uyPEOcY6ca540N0pzwYFAVw4hUU6ZBGRyeHPPA6Ga7Az_KCbMemzLl4yZmriqjNNRYNroAv0eayLwsKeh64oiv8hBdxp5OKmFkxK-2CAyjsmbB7FEQ' },
            { name: 'Batu Tumonga Homestay', type: 'Local Lodge', desc: 'Pemandangan sawah berkabut dari puncak bukit.', price: 'Rp 450.000', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc6KtwA3DqtQmGNYT0zf93pd0fulPEMYOz_WmFoXw70YEwqC6MWXhKMarSvYnWjjcRtSH3n1JfH_3yGCFhsKQlCYFz2q-D7rOqZehIqPKRj9Yv3WZyEJj1cXXfhgEKILTc1GheVjUE-aqOLi91YN4kouhd1WrRSQwe3LpV9Z-W7cm2Yiutz83ugleIhCzOHN7hf-nn9awE65vE_D5xafr1VDgMmA8xqKiV0_blNcKvds7DXEDhzJ24fMk3F9qOAs-i94_6l4kdnI8' }
        ],
        sidebarInfo: {
            jamOperasional: '08:00 — 18:00 WITA',
            waktuTerbaik: 'Juni — Agustus',
            jarakMakassar: '± 310 KM (7-8 Jam)',
            weatherStatus: 'BERAWAN',
            weatherTemp: '22°C'
        }
    },
    2: {
        title: 'Hutan Karst Maros',
        region: 'Kabupaten Maros',
        price: 'Rp 10.000',
        // Koordinat GPS destinasi
        coordinates: { lat: -4.9833, lng: 119.7000 },
        heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc6KtwA3DqtQmGNYT0zf93pd0fulPEMYOz_WmFoXw70YEwqC6MWXhKMarSvYnWjjcRtSH3n1JfH_3yGCFhsKQlCYFz2q-D7rOqZehIqPKRj9Yv3WZyEJj1cXXfhgEKILTc1GheVjUE-aqOLi91YN4kouhd1WrRSQwe3LpV9Z-W7cm2Yiutz83ugleIhCzOHN7hf-nn9awE65vE_D5xafr1VDgMmA8xqKiV0_blNcKvds7DXEDhzJ24fMk3F9qOAs-i94_6l4kdnI8',
        aboutParagraphs: [
            'Terletak di kawasan Geopark Maros-Pangkep, Hutan Karst Maros (khususnya Rammang-Rammang) merupakan labirin batu kapur terbesar kedua di dunia yang menyuguhkan pemandangan menakjubkan dari era prasejarah. Dikelilingi sungai karst yang tenang, destinasi ini menawarkan perjalanan menyusuri air tenang menuju desa terpencil.',
            'Kawasan ini kaya akan nilai geologi, arkeologi dengan lukisan dinding gua prasejarah purba, dan keanekaragaman hayati eksotis yang menjadikannya situs warisan dunia UNESCO.'
        ],
        keindahanAlam: 'Pilar-pilar batu kapur menjulang tinggi diselimuti tanaman merambat hijau subur, memantul anggun di atas permukaan air sungai Pute yang berwarna hijau zamrud. Perjalanan menggunakan perahu tradisional melewati terowongan gua batu adalah harmoni ketenangan yang tiada tara.',
        warisanBudaya: {
            text: 'Masyarakat Rammang-Rammang mengelola ekowisata karst dengan tetap memegang prinsip kearifan lokal dalam menjaga ekosistem hutan batu mereka. Di sekitar karst terdapat gua prasejarah yang membuktikan eksistensi peradaban manusia kuno di Sulawesi Selatan ribuan tahun silam.',
            quote: 'Batu kapur menjaga air kami hidup, hutan karang menjaga jiwa kami tenang.',
            image1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc6KtwA3DqtQmGNYT0zf93pd0fulPEMYOz_WmFoXw70YEwqC6MWXhKMarSvYnWjjcRtSH3n1JfH_3yGCFhsKQlCYFz2q-D7rOqZehIqPKRj9Yv3WZyEJj1cXXfhgEKILTc1GheVjUE-aqOLi91YN4kouhd1WrRSQwe3LpV9Z-W7cm2Yiutz83ugleIhCzOHN7hf-nn9awE65vE_D5xafr1VDgMmA8xqKiV0_blNcKvds7DXEDhzJ24fMk3F9qOAs-i94_6l4kdnI8',
            image2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAChlvmSARo8RJAp3UQjOtUYXO3LwvQFPmO1yjxfzhSuc96U7Qk-H01XARKly92BGXRN_JYh9hrLbhcZ-XKySsBW6eL6f1VTua6Pj2n8l0TjMzQCe9PXBpEADX3zulC6RqA3NctBaTVxu3WYMVT6AVMgJ0jetiZw97rWH9pqDWgUOmk_FP8ueecdRgRMsNmG_Hjy3QnqbykOCi4zWKXUbYnxmzgzOtNjnviDsiwuRXGAzt4nldxDqm8ZKqxdrxOj74LqqHolEvBzc'
        },
        facilities: [
            { icon: '🚤', label: 'Sewa Perahu Jolloro' },
            { icon: '🚿', label: 'Toilet & Warung' },
            { icon: '🅿️', label: 'Parkir Dermaga' },
            { icon: '🕌', label: 'Musholla' },
            { icon: '🚶‍♂️', label: 'Trekking Path' }
        ],
        gallery: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCc6KtwA3DqtQmGNYT0zf93pd0fulPEMYOz_WmFoXw70YEwqC6MWXhKMarSvYnWjjcRtSH3n1JfH_3yGCFhsKQlCYFz2q-D7rOqZehIqPKRj9Yv3WZyEJj1cXXfhgEKILTc1GheVjUE-aqOLi91YN4kouhd1WrRSQwe3LpV9Z-W7cm2Yiutz83ugleIhCzOHN7hf-nn9awE65vE_D5xafr1VDgMmA8xqKiV0_blNcKvds7DXEDhzJ24fMk3F9qOAs-i94_6l4kdnI8',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBAChlvmSARo8RJAp3UQjOtUYXO3LwvQFPmO1yjxfzhSuc96U7Qk-H01XARKly92BGXRN_JYh9hrLbhcZ-XKySsBW6eL6f1VTua6Pj2n8l0TjMzQCe9PXBpEADX3zulC6RqA3NctBaTVxu3WYMVT6AVMgJ0jetiZw97rWH9pqDWgUOmk_FP8ueecdRgRMsNmG_Hjy3QnqbykOCi4zWKXUbYnxmzgzOtNjnviDsiwuRXGAzt4nldxDqm8ZKqxdrxOj74LqqHolEvBzc',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCc6KtwA3DqtQmGNYT0zf93pd0fulPEMYOz_WmFoXw70YEwqC6MWXhKMarSvYnWjjcRtSH3n1JfH_3yGCFhsKQlCYFz2q-D7rOqZehIqPKRj9Yv3WZyEJj1cXXfhgEKILTc1GheVjUE-aqOLi91YN4kouhd1WrRSQwe3LpV9Z-W7cm2Yiutz83ugleIhCzOHN7hf-nn9awE65vE_D5xafr1VDgMmA8xqKiV0_blNcKvds7DXEDhzJ24fMk3F9qOAs-i94_6l4kdnI8',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBAChlvmSARo8RJAp3UQjOtUYXO3LwvQFPmO1yjxfzhSuc96U7Qk-H01XARKly92BGXRN_JYh9hrLbhcZ-XKySsBW6eL6f1VTua6Pj2n8l0TjMzQCe9PXBpEADX3zulC6RqA3NctBaTVxu3WYMVT6AVMgJ0jetiZw97rWH9pqDWgUOmk_FP8ueecdRgRMsNmG_Hjy3QnqbykOCi4zWKXUbYnxmzgzOtNjnviDsiwuRXGAzt4nldxDqm8ZKqxdrxOj74LqqHolEvBzc',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCc6KtwA3DqtQmGNYT0zf93pd0fulPEMYOz_WmFoXw70YEwqC6MWXhKMarSvYnWjjcRtSH3n1JfH_3yGCFhsKQlCYFz2q-D7rOqZehIqPKRj9Yv3WZyEJj1cXXfhgEKILTc1GheVjUE-aqOLi91YN4kouhd1WrRSQwe3LpV9Z-W7cm2Yiutz83ugleIhCzOHN7hf-nn9awE65vE_D5xafr1VDgMmA8xqKiV0_blNcKvds7DXEDhzJ24fMk3F9qOAs-i94_6l4kdnI8'
        ],
        accommodations: [
            { name: 'Rammang Eco Lodge', rating: '4.6', price: 'Rp 550.000', bg: 'linear-gradient(135deg, #2D4A42 0%, #006b5e 100%)' },
            { name: 'Hotel Transit Maros', rating: '4.1', price: 'Rp 350.000', bg: 'linear-gradient(135deg, #006b5e 0%, #23F7DB 100%)' },
            { name: 'Karst Cottage', rating: '4.5', price: 'Rp 400.000', bg: 'linear-gradient(135deg, #b32000 0%, #F5401B 100%)' }
        ],
        stayGrid: [
            { name: 'Maros Karst Eco Resort', type: 'Eco Resort', desc: 'Bungalow kayu ramah lingkungan tepat di pinggir sungai.', price: 'Rp 650.000', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc6KtwA3DqtQmGNYT0zf93pd0fulPEMYOz_WmFoXw70YEwqC6MWXhKMarSvYnWjjcRtSH3n1JfH_3yGCFhsKQlCYFz2q-D7rOqZehIqPKRj9Yv3WZyEJj1cXXfhgEKILTc1GheVjUE-aqOLi91YN4kouhd1WrRSQwe3LpV9Z-W7cm2Yiutz83ugleIhCzOHN7hf-nn9awE65vE_D5xafr1VDgMmA8xqKiV0_blNcKvds7DXEDhzJ24fMk3F9qOAs-i94_6l4kdnI8' },
            { name: 'Pute River Lodge', type: 'River Inn', desc: 'Menginap dalam suasana sepi lembah karst hijau.', price: 'Rp 450.000', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAChlvmSARo8RJAp3UQjOtUYXO3LwvQFPmO1yjxfzhSuc96U7Qk-H01XARKly92BGXRN_JYh9hrLbhcZ-XKySsBW6eL6f1VTua6Pj2n8l0TjMzQCe9PXBpEADX3zulC6RqA3NctBaTVxu3WYMVT6AVMgJ0jetiZw97rWH9pqDWgUOmk_FP8ueecdRgRMsNmG_Hjy3QnqbykOCi4zWKXUbYnxmzgzOtNjnviDsiwuRXGAzt4nldxDqm8ZKqxdrxOj74LqqHolEvBzc' }
        ],
        sidebarInfo: {
            jamOperasional: '07:30 — 17:00 WITA',
            waktuTerbaik: 'April — Oktober',
            jarakMakassar: '± 45 KM (1-1.5 Jam)',
            weatherStatus: 'CERAH',
            weatherTemp: '30°C'
        }
    }
};

// ─── Haversine Formula: Menghitung jarak antara dua titik GPS ───
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius bumi dalam km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Jarak dalam km
}

// ─── Estimasi waktu perjalanan berdasarkan jarak ───
function estimateTravelTime(distanceKm) {
    // Kecepatan rata-rata 60 km/jam untuk jalan antar kota
    const hours = distanceKm / 60;
    if (hours < 1) {
        return `${Math.round(hours * 60)} menit`;
    } else {
        const h = Math.floor(hours);
        const m = Math.round((hours - h) * 60);
        return m > 0 ? `${h} jam ${m} menit` : `${h} jam`;
    }
}

export default function DestinationDetailPage({
    onNavigateHome,
    onNavigateLogin,
    onNavigateRegister,
    onNavigateDestinations,
    onNavigateAllDestinations,
    onNavigateExperiences,
    onNavigateCulture,
    onNavigateJournal,
    onNavigateDrivers,
    destination = {},
    currentUser,
    onLogout
}) {
    const [scrolled, setScrolled] = useState(false);
    const [transportMode, setTransportMode] = useState('driver'); // 'driver' or 'self'
    const [showStay, setShowStay] = useState(false);

    // ─── State GPS ───
    const [gpsStatus, setGpsStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error' | 'denied'
    const [userLocation, setUserLocation] = useState(null);  // { lat, lng }
    const [distanceToDestination, setDistanceToDestination] = useState(null); // dalam km
    const [gpsErrorMessage, setGpsErrorMessage] = useState('');
    
    // Choose active destination data
    const activeId = destination.id || 3;
    const destData = activeId === 3 
        ? defaultDestination 
        : (otherDestinationsData[activeId] || { ...defaultDestination, ...destination });

    const font = "'Plus Jakarta Sans', sans-serif";

    // ─── Koordinat destinasi aktif ───
    const destCoords = destData.coordinates || { lat: -5.6115, lng: 120.4517 };
    const mapEmbedUrl = `https://www.google.com/maps?q=${destCoords.lat},${destCoords.lng}&z=13&output=embed`;

    // ─── Fungsi meminta akses GPS dari browser ───
    const handleRequestGPS = () => {
        if (!navigator.geolocation) {
            setGpsStatus('error');
            setGpsErrorMessage('Browser Anda tidak mendukung GPS.');
            return;
        }
        setGpsStatus('loading');
        setGpsErrorMessage('');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
                const dist = haversineDistance(latitude, longitude, destCoords.lat, destCoords.lng);
                setDistanceToDestination(dist);
                setGpsStatus('success');
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    setGpsStatus('denied');
                    setGpsErrorMessage('Izin lokasi ditolak. Aktifkan lokasi di pengaturan browser.');
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    setGpsStatus('error');
                    setGpsErrorMessage('Sinyal GPS tidak tersedia saat ini.');
                } else {
                    setGpsStatus('error');
                    setGpsErrorMessage('Gagal mendapatkan lokasi. Coba lagi.');
                }
            },
            { timeout: 10000, enableHighAccuracy: true }
        );
    };

    // ─── Buka Google Maps Navigasi dari lokasi user ke destinasi ───
    const handleOpenMapsNavigation = () => {
        const destLat = destCoords.lat;
        const destLng = destCoords.lng;
        let mapsUrl;
        if (userLocation) {
            // Jika lokasi user sudah diketahui, buka navigasi dari user ke destinasi
            mapsUrl = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${destLat},${destLng}`;
        } else {
            // Jika belum ada lokasi user, buka lokasi destinasi saja
            mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destLat},${destLng}`;
        }
        window.open(mapsUrl, '_blank');
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinkStyle = (active = false) => ({
        fontFamily: font,
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.20em',
        textTransform: 'uppercase',
        color: active ? '#b32000' : '#5c4039',
        textDecoration: 'none',
        borderBottom: active ? '2px solid #b32000' : 'none',
        paddingBottom: active ? '4px' : '0',
        transition: 'color 0.3s',
        cursor: 'pointer',
    });

    return (
        <div style={{ backgroundColor: '#E4F0ED', color: '#131e1b', fontFamily: font, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            
            <Navbar
                activePage="destinations"
                onNavigateHome={onNavigateHome}
                onNavigateLogin={onNavigateLogin}
                onNavigateRegister={onNavigateRegister}
                onNavigateDestinations={onNavigateDestinations}
                onNavigateExperiences={onNavigateExperiences}
                onNavigateCulture={onNavigateCulture}
                onNavigateJournal={onNavigateJournal}
                currentUser={currentUser}
                onLogout={onLogout}
            />

            {/* ── Hero Banner Section ── */}
            <section style={{ position: 'relative', height: '563px', width: '100%', overflow: 'hidden' }}>
                <img 
                    className="w-full h-full object-cover" 
                    alt={destData.title}
                    src={destData.heroImage} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }}></div>
                
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', paddingLeft: '64px', paddingRight: '64px', paddingBottom: '48px' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        {/* Breadcrumbs */}
                        <nav style={{ display: 'flex', gap: '8px', color: 'rgba(255,255,255,0.75)', fontFamily: font, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>
                            <span onClick={onNavigateHome} style={{ cursor: 'pointer' }}>Beranda</span>
                            <span>›</span>
                            <span onClick={onNavigateAllDestinations} style={{ cursor: 'pointer' }}>{destData.region}</span>
                            <span>›</span>
                            <span style={{ color: '#ffffff', fontWeight: 700 }}>{destData.title}</span>
                        </nav>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="material-symbols-outlined" style={{ color: '#23F7DB', fontSize: '16px' }}>location_on</span>
                                <span style={{ color: '#23F7DB', fontFamily: font, fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase' }}>
                                    {destData.region}
                                </span>
                            </div>
                            
                            <h1 style={{ fontFamily: font, fontSize: '56px', lineHeight: 1.1, fontWeight: 800, color: '#ffffff', textShadow: '0 4px 12px rgba(0,0,0,0.4)', margin: 0 }}>
                                {destData.title}
                            </h1>
                            
                            <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
                                {/* Price Badge */}
                                <div className="glass-panel" style={{ padding: '8px 24px', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#ffffff', fontSize: '16px' }}>confirmation_number</span>
                                    <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '14px' }}>Tiket Masuk: {destData.price}</span>
                                </div>
                                
                                {/* Avatar Pile */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ display: 'flex', marginRight: '-12px' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #ffffff', overflow: 'hidden', zIndex: 3 }}>
                                            <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfiq3YDf-xsDWLM77ZZU4kz1kQ9Gnvrxt719cP9k4MxXhKKVT1wsuiXMHnGeSu_3vUq7Bwj2hexpvBoWnLApyLBotUxV22FyzFMGZ08LXjLI2Ae6V52U6Z7HqfY7zMxwm9bhOnTXbLiBlQYQERDD7zd3JT0FcaFYPVTVrn0yFYl9iVHqZ0YBZGIM7kMaiWIoJGpdC3Z3P4fDdQgPNSDQOV2UEUryioy6LnvGX5N4DBAL1wCQxiUlNVJCnfgAMYtgcG2KfBET4w_WA" />
                                        </div>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #ffffff', overflow: 'hidden', marginLeft: '-12px', zIndex: 2 }}>
                                            <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzxZ13jpSbT8eL_QL7atf5eY7x_zEKqL4bqL5j00s91akxjrYEsfj0SRSeUcMpK7Z8Wt-eLb1Ge9ccV6jl-XqppVQbFmrYlVT5i-8c0kDPKrAmc8bVyHWQCEX0yMTcguZ0jyXXn_rDagCx7cQGsUqp7r9HkiL6fNNV60c0IjBzCKvTcxuTNDCC14xlMwiRNYpBRH0S1r5lGmATC3OxNsppVvxuiMd9iiGIWTrtZ4MrsUhjYMjUt_x7RrZWHz_LkVntuwrDBONQ1uk" />
                                        </div>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #ffffff', backgroundColor: '#b32000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '10px', fontWeight: 700, marginLeft: '-12px', zIndex: 1 }}>
                                            +12k
                                        </div>
                                    </div>
                                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontFamily: font }}>Dikunjungi bulan ini</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Main Content Area ── */}
            <main style={{ flex: 1, paddingBottom: '80px', paddingTop: '48px' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: '64px', paddingRight: '64px' }} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Details */}
                    <div className="lg:col-span-8 flex flex-col gap-12">
                        
                        {/* Section 1: About */}
                        <section style={{ backgroundColor: 'transparent' }}>
                            <span className="text-sunset" style={{ display: 'block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>
                                Tentang Destinasi
                            </span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {destData.aboutParagraphs.map((para, idx) => (
                                    <p 
                                        key={idx} 
                                        style={{
                                            fontFamily: font,
                                            fontSize: idx === 0 ? '18px' : '16px',
                                            lineHeight: 1.6,
                                            color: idx === 0 ? '#2D4A42' : '#5c4039',
                                            fontWeight: idx === 0 ? 500 : 400
                                        }}
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </section>

                        {/* Section 1.5: Peta Destinasi */}
                        <section style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '24px', boxShadow: '0 16px 40px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                                <div>
                                    <span className="text-sunset" style={{ display: 'block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>
                                        Peta Lokasi
                                    </span>
                                    <h3 className="text-forest" style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>
                                        {destData.title} di Peta
                                    </h3>
                                </div>
                                <button
                                    onClick={handleOpenMapsNavigation}
                                    style={{
                                        backgroundColor: '#F5401B',
                                        color: '#ffffff',
                                        padding: '12px 20px',
                                        borderRadius: '9999px',
                                        border: 'none',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        boxShadow: '0 8px 20px rgba(245, 64, 27, 0.18)'
                                    }}
                                >
                                    Buka di Google Maps
                                </button>
                            </div>
                            <div style={{ width: '100%', minHeight: '320px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
                                <iframe
                                    title="Peta Destinasi"
                                    src={mapEmbedUrl}
                                    style={{ width: '100%', height: '100%', minHeight: '320px', border: '0' }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            <p style={{ marginTop: '16px', fontSize: '14px', color: '#5c4039' }}>
                                Koordinat: {destCoords.lat.toFixed(5)}, {destCoords.lng.toFixed(5)}
                            </p>
                        </section>

                        {/* Section 2: Narrative Subsections */}
                        <section style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                            {/* Keindahan Alam */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <h3 className="text-forest" style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Keindahan Alam</h3>
                                <p style={{ fontSize: '18px', color: '#2D4A42', lineHeight: 1.6 }}>
                                    {destData.keindahanAlam}
                                </p>
                            </div>

                            {/* Warisan Budaya */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <h3 className="text-forest" style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Warisan Budaya &amp; Kearifan Lokal</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                                    <div className="md:col-span-7 flex flex-col gap-6">
                                        <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', height: '320px' }} className="group">
                                            <img 
                                                alt="Culture view 1" 
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                                                src={destData.warisanBudaya.image1} 
                                            />
                                        </div>
                                        <p style={{ fontSize: '16px', color: '#5c4039', lineHeight: 1.6 }}>
                                            {destData.warisanBudaya.text}
                                        </p>
                                    </div>
                                    
                                    <div className="md:col-span-5 flex flex-col gap-6">
                                        <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', height: '256px' }}>
                                            <img 
                                                alt="Culture view 2" 
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                                                src={destData.warisanBudaya.image2} 
                                            />
                                        </div>
                                        <div style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)' }}>
                                            <p className="text-sunset" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', margin: 0 }}>
                                                Nilai Luhur
                                            </p>
                                            <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#2D4A42', margin: 0, lineHeight: 1.5 }}>
                                                "{destData.warisanBudaya.quote}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Facilities */}
                        <section style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                            {destData.facilities.map((fac, idx) => (
                                <div 
                                    key={idx}
                                    style={{
                                        padding: '12px 24px',
                                        borderRadius: '9999px',
                                        backgroundColor: '#deebe6',
                                        border: '1px solid rgba(255,255,255,0.6)',
                                        color: '#2D4A42',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.backgroundColor = '#F5401B';
                                        e.currentTarget.style.color = '#ffffff';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.backgroundColor = '#deebe6';
                                        e.currentTarget.style.color = '#2D4A42';
                                    }}
                                >
                                    <span>{fac.icon}</span>
                                    <span>{fac.label}</span>
                                </div>
                            ))}
                        </section>

                        {/* Section 4: Gallery Masonry */}
                        <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <h3 className="text-forest" style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Galeri Keindahan</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div style={{ gridColumn: 'span 2', gridRow: 'span 2', overflow: 'hidden', borderRadius: '16px', position: 'relative', height: '336px' }} className="group">
                                    <img className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" src={destData.gallery[0]} alt="Gallery 1" />
                                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)', opacity: 0, transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyCenter: 'center' }} className="hover:opacity-100">
                                        <span className="material-symbols-outlined" style={{ color: '#ffffff', fontSize: '36px' }}>zoom_in</span>
                                    </div>
                                </div>
                                
                                {destData.gallery.slice(1, 5).map((imgUrl, idx) => (
                                    <div key={idx} style={{ overflow: 'hidden', borderRadius: '16px', position: 'relative', height: '160px' }}>
                                        <img className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" src={imgUrl} alt={`Gallery ${idx + 2}`} />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 5: Transport Planner (Interactive) */}
                        <section style={{ backgroundColor: '#eaf6f1', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.5)' }}>
                            <h3 className="text-forest" style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', margin: 0 }}>
                                Rencanakan Transportasi
                            </h3>
                            
                            {/* Toggle Selector Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <button 
                                    onClick={() => setTransportMode('self')}
                                    style={{
                                        padding: '24px',
                                        borderRadius: '16px',
                                        backgroundColor: '#ffffff',
                                        textAlign: 'left',
                                        border: transportMode === 'self' ? '2.5px solid #F5401B' : '2.5px solid transparent',
                                        transition: 'all 0.3s',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span className="material-symbols-outlined" style={{ color: '#F5401B', fontSize: '32px', display: 'block', marginBottom: '8px' }}>directions_car</span>
                                    <span style={{ display: 'block', fontWeight: 700, fontSize: '18px', color: '#131e1b' }}>Ya, Punya Kendaraan</span>
                                    <span style={{ fontSize: '14px', color: '#5c4039' }}>Gunakan rute navigasi mandiri.</span>
                                </button>
                                
                                <button 
                                    onClick={() => setTransportMode('driver')}
                                    style={{
                                        padding: '24px',
                                        borderRadius: '16px',
                                        backgroundColor: '#ffffff',
                                        textAlign: 'left',
                                        border: transportMode === 'driver' ? '2.5px solid #006b5e' : '2.5px solid transparent',
                                        transition: 'all 0.3s',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span className="material-symbols-outlined" style={{ color: '#006b5e', fontSize: '32px', display: 'block', marginBottom: '8px' }}>hail</span>
                                    <span style={{ display: 'block', fontWeight: 700, fontSize: '18px', color: '#131e1b' }}>Tidak, Butuh Driver</span>
                                    <span style={{ fontSize: '14px', color: '#5c4039' }}>Sewa armada dengan supir lokal.</span>
                                </button>
                            </div>

                            {/* Conditional Panels */}
                            {transportMode === 'driver' ? (
                                <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                    <h4 className="text-forest" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', margin: 0 }}>
                                        Pemesanan Driver Lokal
                                    </h4>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                                        {/* Option 1 */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '12px', border: '1px solid rgba(19, 30, 27, 0.1)' }} className="dest-detail-card-hover cursor-pointer">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <span className="material-symbols-outlined" style={{ color: '#F5401B', fontSize: '24px' }}>local_taxi</span>
                                                <div>
                                                    <p style={{ fontWeight: 700, margin: 0, fontSize: '16px' }}>Antar-Jemput Saja (One-Way)</p>
                                                    <p style={{ fontSize: '12px', color: '#5c4039', margin: 0 }}>Drop-off / Pick-up Bandara atau Kota</p>
                                                </div>
                                            </div>
                                            <span style={{ fontWeight: 700, color: '#2D4A42', fontSize: '18px' }}>Rp 450.000</span>
                                        </div>

                                        {/* Option 2 (Selected State) */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '12px', border: '2.5px solid #F5401B', backgroundColor: 'rgba(245, 64, 27, 0.04)' }} className="cursor-pointer">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <span className="material-symbols-outlined" style={{ color: '#F5401B', fontSize: '24px' }}>schedule</span>
                                                <div>
                                                    <p style={{ fontWeight: 700, margin: 0, fontSize: '16px' }}>Full Day Service (12 Jam)</p>
                                                    <p style={{ fontSize: '12px', color: '#5c4039', margin: 0 }}>Bebas keliling destinasi wisata &amp; kuliner</p>
                                                </div>
                                            </div>
                                            <span style={{ fontWeight: 700, color: '#2D4A42', fontSize: '18px' }}>Rp 750.000</span>
                                        </div>

                                        {/* Option 3 */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '12px', border: '1px solid rgba(19, 30, 27, 0.1)' }} className="dest-detail-card-hover cursor-pointer">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <span className="material-symbols-outlined" style={{ color: '#F5401B', fontSize: '24px' }}>explore</span>
                                                <div>
                                                    <p style={{ fontWeight: 700, margin: 0, fontSize: '16px' }}>Multi-Day Exploration</p>
                                                    <p style={{ fontSize: '12px', color: '#5c4039', margin: 0 }}>Paket perjalanan khusus 3 Hari 2 Malam</p>
                                                </div>
                                            </div>
                                            <span style={{ fontWeight: 700, color: '#2D4A42', fontSize: '18px' }}>Rp 2.000.000</span>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {/* Action buttons */}
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                                            <button 
                                                className="btn-pulse"
                                                style={{
                                                    flex: 2,
                                                    backgroundColor: '#F5401B',
                                                    color: '#ffffff',
                                                    padding: '16px 24px',
                                                    borderRadius: '9999px',
                                                    fontWeight: 700,
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '12px',
                                                    boxShadow: '0 8px 20px rgba(245, 64, 27, 0.25)',
                                                    minWidth: '200px'
                                                }}
                                            >
                                                <span className="material-symbols-outlined">check_circle</span>
                                                Pesan Driver Sekarang
                                            </button>
                                            
                                            {/* USER EXPLICIT REQUEST: Selengkapnya button */}
                                            <button 
                                                onClick={onNavigateDrivers}
                                                style={{
                                                    flex: 1,
                                                    border: '2.5px solid #006b5e',
                                                    color: '#006b5e',
                                                    backgroundColor: 'transparent',
                                                    padding: '16px 24px',
                                                    borderRadius: '9999px',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    transition: 'all 0.3s',
                                                    minWidth: '150px'
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.backgroundColor = '#006b5e';
                                                    e.currentTarget.style.color = '#ffffff';
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.color = '#006b5e';
                                                }}
                                            >
                                                Selengkapnya
                                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                                            </button>
                                        </div>
                                        
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#5c4039', fontSize: '14px' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#006b5e' }}>verified</span>
                                            <span>Driver terverifikasi berpengalaman &amp; pemandu bersertifikat lokal</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }} className="animate-in fade-in slide-in-from-top-4 duration-500">
                                    <h4 className="text-forest" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', margin: 0 }}>
                                        Panduan Rute Navigasi Mandiri
                                    </h4>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
                                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#F5401B', padding: '8px', backgroundColor: 'rgba(245, 64, 27, 0.1)', borderRadius: '12px' }}>map</span>
                                            <div>
                                                <p style={{ fontWeight: 700, margin: '0 0 4px 0' }}>Rute Utama (Makassar - Tanjung Bira)</p>
                                                <p style={{ fontSize: '14px', color: '#5c4039', margin: 0, lineHeight: 1.5 }}>
                                                    Makassar → Gowa → Takalar → Jeneponto → Bantaeng → Bulukumba → Tanjung Bira. Jalan lintas provinsi aspal mulus dengan pemandangan pesisir pantai selatan.
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-3 gap-4" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <span style={{ display: 'block', fontSize: '12px', color: '#5c4039', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Jarak</span>
                                                <span style={{ fontWeight: 700, fontSize: '18px', color: gpsStatus === 'success' ? '#006b5e' : '#2D4A42' }}>
                                                    {gpsStatus === 'success' && distanceToDestination !== null
                                                        ? (distanceToDestination < 1
                                                            ? `${Math.round(distanceToDestination * 1000)} m`
                                                            : `${distanceToDestination.toFixed(0)} km`)
                                                        : destData.sidebarInfo.jarakMakassar.split(' ')[0] + ' ' + destData.sidebarInfo.jarakMakassar.split(' ')[1]}
                                                </span>
                                                {gpsStatus === 'success' && <span style={{ fontSize: '9px', color: '#006b5e', fontWeight: 700 }}>dari Anda</span>}
                                            </div>
                                            <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(0,0,0,0.05)', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
                                                <span style={{ display: 'block', fontSize: '12px', color: '#5c4039', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Waktu</span>
                                                <span style={{ fontWeight: 700, fontSize: '18px', color: gpsStatus === 'success' ? '#006b5e' : '#2D4A42' }}>
                                                    {gpsStatus === 'success' && distanceToDestination !== null
                                                        ? estimateTravelTime(distanceToDestination)
                                                        : destData.sidebarInfo.jarakMakassar.split('(')[1]?.replace(')', '') || '4-5 Jam'}
                                                </span>
                                                {gpsStatus === 'success' && <span style={{ fontSize: '9px', color: '#006b5e', fontWeight: 700 }}>estimasi</span>}
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <span style={{ display: 'block', fontSize: '12px', color: '#5c4039', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Kondisi</span>
                                                <span style={{ fontWeight: 700, fontSize: '18px', color: '#2D4A42' }}>Bagus</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* GPS status di panel rute mandiri */}
                                    {gpsStatus === 'success' && distanceToDestination !== null && (
                                        <div style={{ display: 'flex', gap: '12px', padding: '12px 16px', backgroundColor: 'rgba(0,107,94,0.07)', borderRadius: '12px', marginBottom: '8px', alignItems: 'center' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#006b5e', fontSize: '20px' }}>my_location</span>
                                            <div>
                                                <span style={{ fontWeight: 700, color: '#006b5e', display: 'block', fontSize: '14px' }}>
                                                    {distanceToDestination < 1
                                                        ? `${Math.round(distanceToDestination * 1000)} m dari lokasi Anda`
                                                        : `${distanceToDestination.toFixed(1)} km dari lokasi Anda`}
                                                </span>
                                                <span style={{ fontSize: '12px', color: '#5c4039' }}>Est. {estimateTravelTime(distanceToDestination)} berkendara</span>
                                            </div>
                                        </div>
                                    )}
                                    {gpsStatus !== 'success' && (
                                        <button
                                            onClick={handleRequestGPS}
                                            disabled={gpsStatus === 'loading'}
                                            style={{
                                                width: '100%',
                                                backgroundColor: gpsStatus === 'loading' ? '#aaa' : '#006b5e',
                                                color: '#ffffff',
                                                padding: '12px 16px',
                                                borderRadius: '12px',
                                                fontWeight: 700,
                                                border: 'none',
                                                cursor: gpsStatus === 'loading' ? 'not-allowed' : 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '10px',
                                                fontSize: '14px',
                                                marginBottom: '8px',
                                                transition: 'background-color 0.3s'
                                            }}
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>my_location</span>
                                            {gpsStatus === 'loading' ? 'Mendeteksi Lokasi…' : 'Deteksi Jarak dari Lokasi Saya'}
                                        </button>
                                    )}
                                    <button 
                                        id="btn-maps-rute"
                                        onClick={handleOpenMapsNavigation}
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#2D4A42',
                                            color: '#ffffff',
                                            padding: '16px',
                                            borderRadius: '9999px',
                                            fontWeight: 700,
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            boxShadow: '0 8px 20px rgba(45, 74, 66, 0.2)'
                                        }}
                                    >
                                        <span className="material-symbols-outlined">navigation</span>
                                        {userLocation ? 'Navigasi ke Destinasi' : 'Buka Google Maps Navigator'}
                                    </button>
                                </div>
                            )}
                        </section>

                        {/* Section 6: Rekomendasi Penginapan */}
                        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <h3 className="text-forest" style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Rekomendasi Penginapan</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {destData.accommodations.map((acc, idx) => (
                                    <div key={idx} style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0, 64, 50, 0.05)', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.03)' }} className="dest-detail-card-hover">
                                        <div style={{ height: '160px', background: acc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#ffffff', opacity: 0.6 }}>hotel</span>
                                        </div>
                                        <div style={{ padding: '20px' }}>
                                            <h4 style={{ fontWeight: 700, fontSize: '18px', margin: '0 0 8px 0', color: '#131e1b' }}>{acc.name}</h4>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F5401B', marginBottom: '12px' }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span style={{ fontSize: '12px', fontWeight: 700 }}>{acc.rating}</span>
                                            </div>
                                            <p style={{ fontSize: '14px', color: '#5c4039', margin: 0 }}>
                                                Mulai dari <span style={{ color: '#2D4A42', fontWeight: 700 }}>{acc.price}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 7: Pilihan Akomodasi (Toggled Section) */}
                        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '32px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                                <h3 className="text-forest" style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Pilihan Akomodasi Alternatif</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#2D4A42' }}>Apakah Anda berencana menginap?</span>
                                    <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input 
                                            type="checkbox" 
                                            checked={showStay} 
                                            onChange={() => setShowStay(!showStay)} 
                                            style={{ display: 'none' }}
                                        />
                                        <div 
                                            style={{
                                                width: '56px',
                                                height: '28px',
                                                backgroundColor: showStay ? '#F5401B' : '#d9e5e0',
                                                borderRadius: '9999px',
                                                position: 'relative',
                                                transition: 'background-color 0.3s'
                                            }}
                                        >
                                            <div 
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    backgroundColor: '#ffffff',
                                                    borderRadius: '50%',
                                                    position: 'absolute',
                                                    top: '2px',
                                                    left: showStay ? '30px' : '2px',
                                                    transition: 'left 0.3s',
                                                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                                }}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Toggled Grid */}
                            {showStay && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in zoom-in-95 duration-500">
                                    {destData.stayGrid.map((stay, idx) => (
                                        <div key={idx} style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }} className="group dest-detail-card-hover">
                                            <div style={{ height: '192px', overflow: 'hidden', position: 'relative' }}>
                                                <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={stay.image} alt={stay.name} />
                                                <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, color: '#F5401B' }}>
                                                    {stay.type}
                                                </div>
                                            </div>
                                            <div style={{ padding: '24px' }}>
                                                <h4 style={{ fontWeight: 700, fontSize: '20px', margin: '0 0 4px 0', color: '#131e1b' }}>{stay.name}</h4>
                                                <p style={{ fontSize: '14px', color: '#5c4039', margin: '0 0 16px 0' }}>{stay.desc}</p>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '18px', fontWeight: 700, color: '#2D4A42' }}>
                                                        {stay.price}
                                                        <span style={{ fontSize: '12px', fontWeight: 400, color: '#5c4039' }}> / malam</span>
                                                    </span>
                                                    <button 
                                                        style={{
                                                            backgroundColor: '#b32000',
                                                            color: '#ffffff',
                                                            padding: '8px 24px',
                                                            borderRadius: '9999px',
                                                            fontSize: '14px',
                                                            fontWeight: 700,
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            transition: 'background-color 0.3s'
                                                        }}
                                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5401B'}
                                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#b32000'}
                                                    >
                                                        Booking
                                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                    </div>

                    {/* Right Column: Sticky Sidebar */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div style={{ position: 'sticky', top: '112px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            
                            {/* Sticky Info Card */}
                            <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px' }}>
                                <h3 className="text-forest" style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px', margin: 0 }}>
                                    Informasi Destinasi
                                </h3>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                        <div style={{ backgroundColor: 'rgba(245, 64, 27, 0.1)', padding: '8px', borderRadius: '12px' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#F5401B' }}>schedule</span>
                                        </div>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#5c4039' }}>JAM OPERASIONAL</span>
                                            <span style={{ fontWeight: 700, fontSize: '16px', color: '#131e1b' }}>{destData.sidebarInfo.jamOperasional}</span>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                        <div style={{ backgroundColor: 'rgba(245, 64, 27, 0.1)', padding: '8px', borderRadius: '12px' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#F5401B' }}>calendar_month</span>
                                        </div>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#5c4039' }}>WAKTU TERBAIK</span>
                                            <span style={{ fontWeight: 700, fontSize: '16px', color: '#131e1b' }}>{destData.sidebarInfo.waktuTerbaik}</span>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                        <div style={{ backgroundColor: 'rgba(245, 64, 27, 0.1)', padding: '8px', borderRadius: '12px' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#F5401B' }}>distance</span>
                                        </div>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#5c4039' }}>JARAK DARI MAKASSAR</span>
                                            <span style={{ fontWeight: 700, fontSize: '16px', color: '#131e1b' }}>{destData.sidebarInfo.jarakMakassar}</span>
                                        </div>
                                    </div>
                                    
                                    {/* ── GPS Distance Block ── */}
                                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px' }}>
                                        <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#5c4039', marginBottom: '10px' }}>JARAK DARI LOKASI ANDA</span>

                                        {/* Idle state: tombol aktifkan GPS */}
                                        {gpsStatus === 'idle' && (
                                            <button
                                                id="btn-aktifkan-gps"
                                                onClick={handleRequestGPS}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    width: '100%',
                                                    padding: '10px 16px',
                                                    borderRadius: '12px',
                                                    border: '1.5px dashed #b32000',
                                                    backgroundColor: 'rgba(179,32,0,0.04)',
                                                    color: '#b32000',
                                                    fontWeight: 700,
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s',
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.backgroundColor = 'rgba(179,32,0,0.1)';
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.backgroundColor = 'rgba(179,32,0,0.04)';
                                                }}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>my_location</span>
                                                Aktifkan Lokasi GPS
                                            </button>
                                        )}

                                        {/* Loading state */}
                                        {gpsStatus === 'loading' && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0' }}>
                                                <div style={{
                                                    width: '18px', height: '18px', borderRadius: '50%',
                                                    border: '2.5px solid #b32000',
                                                    borderTopColor: 'transparent',
                                                    animation: 'spin 0.8s linear infinite'
                                                }} />
                                                <span style={{ fontSize: '13px', color: '#5c4039', fontWeight: 600 }}>Mendeteksi lokasi Anda…</span>
                                            </div>
                                        )}

                                        {/* Success state: tampilkan jarak real */}
                                        {gpsStatus === 'success' && distanceToDestination !== null && (
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                                                    <div style={{ backgroundColor: 'rgba(0, 107, 94, 0.1)', padding: '6px', borderRadius: '10px' }}>
                                                        <span className="material-symbols-outlined" style={{ color: '#006b5e', fontSize: '20px' }}>near_me</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ display: 'block', fontWeight: 800, fontSize: '20px', color: '#006b5e', lineHeight: 1 }}>
                                                            {distanceToDestination < 1
                                                                ? `${Math.round(distanceToDestination * 1000)} m`
                                                                : `${distanceToDestination.toFixed(1)} km`}
                                                        </span>
                                                        <span style={{ fontSize: '11px', color: '#5c4039' }}>dari lokasi Anda sekarang</span>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', backgroundColor: 'rgba(0,107,94,0.06)', borderRadius: '8px', marginBottom: '8px' }}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#006b5e' }}>schedule</span>
                                                    <span style={{ fontSize: '12px', color: '#2D4A42', fontWeight: 600 }}>
                                                        Est. {estimateTravelTime(distanceToDestination)} berkendara
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={handleRequestGPS}
                                                    style={{ fontSize: '11px', color: '#b32000', fontWeight: 700, textDecoration: 'underline', border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                                                >
                                                    Perbarui Lokasi
                                                </button>
                                            </div>
                                        )}

                                        {/* Error / Denied state */}
                                        {(gpsStatus === 'error' || gpsStatus === 'denied') && (
                                            <div style={{ padding: '10px 12px', backgroundColor: 'rgba(179,32,0,0.06)', borderRadius: '10px', border: '1px solid rgba(179,32,0,0.15)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                                    <span className="material-symbols-outlined" style={{ color: '#b32000', fontSize: '16px' }}>location_off</span>
                                                    <span style={{ fontSize: '12px', color: '#b32000', fontWeight: 700 }}>
                                                        {gpsStatus === 'denied' ? 'Izin ditolak' : 'Gagal mendapat lokasi'}
                                                    </span>
                                                </div>
                                                <p style={{ fontSize: '11px', color: '#5c4039', margin: '0 0 8px 0', lineHeight: 1.4 }}>{gpsErrorMessage}</p>
                                                <button
                                                    onClick={handleRequestGPS}
                                                    style={{ fontSize: '11px', color: '#b32000', fontWeight: 700, textDecoration: 'underline', border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                                                >
                                                    Coba Lagi
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Quick Action Buttons */}
                                <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <button 
                                        id="btn-buka-maps"
                                        className="btn-pulse"
                                        onClick={handleOpenMapsNavigation}
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#F5401B',
                                            color: '#ffffff',
                                            padding: '16px',
                                            borderRadius: '9999px',
                                            fontWeight: 700,
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            boxShadow: '0 8px 20px rgba(245, 64, 27, 0.2)'
                                        }}
                                    >
                                        <span className="material-symbols-outlined">navigation</span>
                                        {userLocation ? 'Navigasi ke Destinasi' : 'Buka Google Maps'}
                                    </button>
                                    
                                    <button 
                                        style={{
                                            width: '100%',
                                            border: '2px solid #F5401B',
                                            color: '#F5401B',
                                            backgroundColor: 'transparent',
                                            padding: '16px',
                                            borderRadius: '9999px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.backgroundColor = 'rgba(245, 64, 27, 0.05)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        <span className="material-symbols-outlined">share</span>
                                        Bagikan Destinasi
                                    </button>
                                </div>
                                
                                {/* Mini Weather Widget */}
                                <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'rgba(222, 47, 8, 0.08)', borderRadius: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#F5401B', fontSize: '32px' }}>sunny</span>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#F5401B' }}>{destData.sidebarInfo.weatherStatus}</span>
                                            <span style={{ fontSize: '20px', fontWeight: 800, color: '#2D4A42' }}>{destData.sidebarInfo.weatherTemp}</span>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ display: 'block', fontSize: '10px', color: '#5c4039', fontWeight: 700 }}>{destData.title.toUpperCase().split(' ').slice(-1)[0]}</span>
                                        <span style={{ fontSize: '10px', color: '#5c4039' }}>Diperbarui 10m lalu</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </main>

            <Footer
                onNavigateHome={onNavigateHome}
                onNavigateDestinations={onNavigateDestinations}
                onNavigateExperiences={onNavigateExperiences}
                onNavigateCulture={onNavigateCulture}
                onNavigateJournal={onNavigateJournal}
            />

        </div>
    );
}
