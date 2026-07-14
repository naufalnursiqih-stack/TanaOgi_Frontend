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
            bg: 'linear-gradient(135deg, #0f1a17 0%, #f5401b 100%)'
        },
        {
            name: 'Cosmos Bungalows',
            rating: '4.5',
            price: 'Rp 650.000',
            bg: 'linear-gradient(135deg, #f5401b 0%, #23F7DB 100%)'
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
            { name: 'Lolai High Resort', rating: '4.7', price: 'Rp 1.100.000', bg: 'linear-gradient(135deg, #0f1a17 0%, #f5401b 100%)' },
            { name: 'Toraja Heritage Hotel', rating: '4.8', price: 'Rp 1.450.000', bg: 'linear-gradient(135deg, #b32000 0%, #F5401B 100%)' },
            { name: 'Tongkonan Homestay', rating: '4.4', price: 'Rp 300.000', bg: 'linear-gradient(135deg, #f5401b 0%, #23F7DB 100%)' }
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
            { name: 'Rammang Eco Lodge', rating: '4.6', price: 'Rp 550.000', bg: 'linear-gradient(135deg, #0f1a17 0%, #f5401b 100%)' },
            { name: 'Hotel Transit Maros', rating: '4.1', price: 'Rp 350.000', bg: 'linear-gradient(135deg, #f5401b 0%, #23F7DB 100%)' },
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
    onLogout,
    wishlistCount,
    onWishlistToggle
}) {
    const [scrolled, setScrolled] = useState(false);
    const [transportMode, setTransportMode] = useState('driver'); // 'driver' or 'self'
    const [showStay, setShowStay] = useState(false);
    const [weatherTab, setWeatherTab] = useState('today'); // 'today' | 'forecast' | 'packing'

    const weatherDataMap = {
        1: { // Toraja
            temp: '22°C',
            status: 'Berawan & Sejuk',
            feelsLike: '21°C',
            humidity: '82%',
            wind: '8 km/h',
            icon: 'cloudy',
            color: '#f5401b',
            forecast: [
                { day: 'Besok', temp: '21°C', status: 'Hujan Ringan', icon: 'rainy' },
                { day: 'Lusa', temp: '23°C', status: 'Berawan', icon: 'cloudy' }
            ],
            packing: [
                'Jaket Tebal / Fleece (Suhu dingin)',
                'Sepatu trekking anti-selip (Gua & sawah)',
                'Payung / Jas Hujan portable (Hujan sore)',
                'Pelembab kulit (Udara gunung sejuk)'
            ]
        },
        2: { // Maros
            temp: '30°C',
            status: 'Cerah Berawan',
            feelsLike: '33°C',
            humidity: '75%',
            wind: '12 km/h',
            icon: 'partly_cloudy_day',
            color: '#b32000',
            forecast: [
                { day: 'Besok', temp: '31°C', status: 'Cerah Terang', icon: 'sunny' },
                { day: 'Lusa', temp: '30°C', status: 'Hujan Kilat Sore', icon: 'thunderstorm' }
            ],
            packing: [
                'Pakaian katun (Menyerap keringat)',
                'Losion anti-nyamuk (Sungai & gua)',
                'Sepatu trekking anti-selip (Karst licin)',
                'Topi & Kacamata Hitam (Terik matahari)'
            ]
        },
        3: { // Bira
            temp: '31°C',
            status: 'Cerah Pesisir',
            feelsLike: '34°C',
            humidity: '68%',
            wind: '18 km/h',
            icon: 'sunny',
            color: '#b32000',
            forecast: [
                { day: 'Besok', temp: '32°C', status: 'Cerah Terang', icon: 'sunny' },
                { day: 'Lusa', temp: '31°C', status: 'Cerah Berangin', icon: 'air' }
            ],
            packing: [
                'Baju renang & Sandal jepit (Aktivitas air)',
                'Tabir surya / Sunscreen SPF 50+',
                'Kacamata hitam & Topi pantai lebar',
                'Pakaian linen / katun tipis berpori'
            ]
        }
    };

    // Choose active destination data
    const activeId = destination.id || 3;
    const baseDest = activeId === 3 
    ? defaultDestination 
    : (otherDestinationsData[activeId] || { ...defaultDestination, ...destination });

    const [realDestination, setRealDestination] = useState(null);
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);

    // Build image URL from backend storage
    const BACKEND_STORAGE = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');
    const getImgUrl = (images) => {
        if (!images || images.length === 0) return null;
        const first = images[0];
        const url = typeof first === 'string' ? first : first?.url;
        if (!url) return null;
        if (url.startsWith('http')) return url;
        return `${BACKEND_STORAGE}/storage/${url}`;
    };

    const normalizeFacilities = (facs, fallback) => {
        if (!facs) return fallback || [];
        // If it's a JSON string, try to parse it
        let parsed = facs;
        if (typeof facs === 'string') {
            try {
                parsed = JSON.parse(facs);
            } catch (e) {
                // If it is just a plain comma-separated string
                parsed = facs.split(',').map(s => s.trim());
            }
        }
        // If parsed is still an object but not array (e.g. {"category":"NATURE"}), treat it as empty or invalid
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            parsed = Object.values(parsed).filter(val => typeof val === 'string');
        }
        if (!Array.isArray(parsed)) return fallback || [];

        const iconMap = {
            'toilet': '🚿',
            'bilas': '🚿',
            'parkir': '🅿️',
            'warung': '☕',
            'makan': '☕',
            'kuliner': '☕',
            'pemandu': '🧭',
            'perahu': '🚤',
            'gazebo': '🏕️',
            'sewa': '🤿',
            'selam': '🤿',
            'snorkeling': '🤿',
            'dermaga': '⚓',
            'musholla': '🕌',
            'mesjid': '🕌',
            'foto': '📸',
            'kamera': '📸'
        };

        return parsed.map(item => {
            if (typeof item === 'string') {
                const lower = item.toLowerCase();
                let icon = '✨';
                for (const key in iconMap) {
                    if (lower.includes(key)) {
                        icon = iconMap[key];
                        break;
                    }
                }
                return { icon, label: item };
            }
            if (item && typeof item === 'object') {
                return {
                    icon: item.icon || '✨',
                    label: item.label || item.name || 'Fasilitas'
                };
            }
            return null;
        }).filter(Boolean);
    };

    // Merge in real data from database if available
    const destData = {
        ...baseDest,
        // Always normalize facilities, whether from realDestination or baseDest
        facilities: normalizeFacilities(
            realDestination ? realDestination.facilities : baseDest.facilities,
            defaultDestination.facilities
        ),
        ...(realDestination ? {
            id: realDestination.id,
            slug: realDestination.slug,
            title: realDestination.name,
            region: realDestination.regency?.name || baseDest.region || '',
            price: realDestination.ticket_price === 0
                ? 'Gratis'
                : `Rp ${realDestination.ticket_price?.toLocaleString('id-ID')}`,
            heroImage: getImgUrl(realDestination.images) || baseDest.heroImage,
            gallery: realDestination.images
                ? realDestination.images.map(img => typeof img === 'string' ? img : img?.url).filter(Boolean).map(u => u.startsWith('http') ? u : `${BACKEND_STORAGE}/storage/${u}`)
                : baseDest.gallery,
            aboutParagraphs: realDestination.description
                ? [realDestination.description]
                : baseDest.aboutParagraphs,
            keindahanAlam: realDestination.description 
                ? `${realDestination.name} menawarkan pesona keindahan alam yang luar biasa dan lanskap memukau. ${realDestination.description}`
                : baseDest.keindahanAlam,
            warisanBudaya: {
                text: realDestination.description 
                    ? `Kawasan ${realDestination.name} juga menyimpan nilai-nilai budaya luhur dan kearifan lokal yang dijaga erat oleh masyarakat setempat.` 
                    : baseDest.warisanBudaya.text,
                quote: `Menjaga alam dan warisan leluhur di ${realDestination.name} untuk generasi mendatang.`,
                image1: getImgUrl(realDestination.images) || baseDest.warisanBudaya.image1,
                image2: (realDestination.images && realDestination.images.length > 1) 
                    ? getImgUrl([realDestination.images[1]]) 
                    : (getImgUrl(realDestination.images) || baseDest.warisanBudaya.image2),
            },
            accommodations: (realDestination.accommodations || []).map(acc => ({
                ...acc,
                name: acc.name,
                type: acc.type || 'Hotel',
                price: acc.price || `Rp ${acc.price_per_night?.toLocaleString('id-ID')}`,
                address: acc.address || '',
                latitude: acc.latitude,
                longitude: acc.longitude,
            })),
            stayGrid: (realDestination.accommodations || []).map(acc => ({
                ...acc,
                name: acc.name,
                type: acc.type || 'Hotel',
                price: acc.price || `Rp ${acc.price_per_night?.toLocaleString('id-ID')}`,
                address: acc.address || '',
            })),
            coordinates: {
                lat: parseFloat(realDestination.latitude) || baseDest.coordinates?.lat || -5.6115,
                lng: parseFloat(realDestination.longitude) || baseDest.coordinates?.lng || 120.4517,
            },
        } : {})
    };

    useEffect(() => {
        let isMounted = true;
        // Use slug for lookup, fall back to id
        const slugOrId = destination.slug || destination.id;
        if (!slugOrId) return;
        fetch(`/api/v1/destinations/${slugOrId}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (isMounted && data && data.success) {
                    setRealDestination(data.data);
                }
            })
            .catch(err => console.error('Error fetching destination detail:', err));
        return () => { isMounted = false; };
    }, [destination.slug, destination.id]);

    useEffect(() => {
        let isMounted = true;
        fetch('/api/v1/drivers')
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (isMounted && data && data.success && data.data) {
                    setDrivers(data.data);
                    if (data.data.length > 0) {
                        setSelectedDriver(data.data[0]);
                    }
                }
            })
            .catch(err => console.error("Error fetching drivers:", err));
        return () => { isMounted = false; };
    }, []);

    // ─── State GPS ───
    const [gpsStatus, setGpsStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error' | 'denied'
    const [userLocation, setUserLocation] = useState(null);  // { lat, lng }
    const [distanceToDestination, setDistanceToDestination] = useState(null); // dalam km
    const [gpsErrorMessage, setGpsErrorMessage] = useState('');

    // --- Booking state additions ---
    const [visitDate, setVisitDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    });
    const [paxCount, setPaxCount] = useState(1);
    const [includeDriver, setIncludeDriver] = useState(false);
    const [driverPackage, setDriverPackage] = useState('full-day'); // 'point-to-point' | 'full-day' | 'multi-day'
    const [includeHotel, setIncludeHotel] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showMockPayment, setShowMockPayment] = useState(false);
    const [successInvoice, setSuccessInvoice] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('va');
    const [mockBank, setMockBank] = useState('BCA');
    const [mockWallet, setMockWallet] = useState('GoPay');
    const [midtransReady, setMidtransReady] = useState(false);
    const [bookingStep, setBookingStep] = useState(1);
    const [activeMapTab, setActiveMapTab] = useState('destination'); // 'destination' | 'hotel'
    const [customerName, setCustomerName] = useState(currentUser ? (currentUser.name || '') : '');
    const [customerPhone, setCustomerPhone] = useState(currentUser ? (currentUser.whatsapp || '') : '');
    const [bookingNotes, setBookingNotes] = useState('');

    useEffect(() => {
        if (currentUser) {
            setCustomerName(prev => prev || currentUser.name || '');
            setCustomerPhone(prev => prev || currentUser.whatsapp || '');
        }
    }, [currentUser]);

    useEffect(() => {
        let isActive = true;

        fetch('/api/v1/payments/config')
            .then((response) => response.ok ? response.json() : null)
            .then((config) => {
                if (!isActive || !config?.enabled || window.snap) return;

                const script = document.createElement('script');
                script.src = config.snap_url;
                script.dataset.clientKey = config.client_key;
                script.onload = () => isActive && setMidtransReady(true);
                document.head.appendChild(script);
            })
            .catch(() => {});

        if (window.snap) setMidtransReady(true);
        return () => { isActive = false; };
    }, []);

    const bookingWidgetRef = React.useRef(null);

    const parsePrice = (str) => {
        if (!str) return 0;
        const clean = str.replace(/[^0-9]/g, '');
        return parseInt(clean, 10) || 0;
    };

    const allHotels = [
        ...(destData?.accommodations || []),
        ...(destData?.stayGrid || [])
    ].filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);
    const hasWebPayment = includeDriver || (includeHotel && selectedHotel);


    const triggerDriverBooking = (pkgType = 'full-day') => {
        setIncludeDriver(true);
        setDriverPackage(pkgType);
        setTimeout(() => {
            bookingWidgetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const triggerHotelBooking = (hotelName) => {
        setIncludeHotel(true);
        setSelectedHotel(hotelName);
        setTimeout(() => {
            bookingWidgetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const handleConfirmBooking = async () => {
        if (!currentUser) {
            alert("Silakan masuk (login) terlebih dahulu untuk melakukan reservasi.");
            onNavigateLogin();
            return;
        }

        if (!customerName.trim()) {
            alert("Nama kontak wajib diisi.");
            return;
        }
        if (!customerPhone.trim()) {
            alert("Nomor WhatsApp wajib diisi.");
            return;
        }
        if (includeDriver && !selectedDriver) {
            alert("Silakan pilih driver terlebih dahulu.");
            return;
        }

        const ticketPriceNum = parsePrice(destData.price);
        const driverPriceNum = includeDriver 
            ? (driverPackage === 'point-to-point' ? 450000 : driverPackage === 'full-day' ? 750000 : 2000000)
            : 0;
        const hotelObj = allHotels.find(h => h.name === selectedHotel);
        const hotelPriceNum = (includeHotel && hotelObj) ? parsePrice(hotelObj.price) : 0;
        const totalNum = driverPriceNum + hotelPriceNum;

        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch('/api/v1/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    destination_id: String(activeId || '3'),
                    visit_date: visitDate,
                    pax_count: paxCount,
                    has_driver: includeDriver,
                    driver_package: includeDriver ? driverPackage : null,
                    driver_price: driverPriceNum,
                    driver_id: (includeDriver && selectedDriver) ? selectedDriver.id : null,
                    include_hotel: includeHotel,
                    selected_hotel: includeHotel ? selectedHotel : null,
                    hotel_price: hotelPriceNum,
                    accommodation_id: (includeHotel && hotelObj) ? hotelObj.id : null,
                    customer_name: customerName,
                    customer_phone: customerPhone,
                    notes: (includeDriver && selectedDriver) 
                        ? `[Driver Pilihan: ${selectedDriver.name}] ${bookingNotes}` 
                        : bookingNotes,
                    payment_method: hasWebPayment ? 'midtrans' : null
                })
            });

            const data = await res.json();
            if (!res.ok) {
                if (data.errors) {
                    const errMsgs = Object.values(data.errors).flat().join('\n');
                    throw new Error(errMsgs);
                }
                throw new Error(data.message || 'Gagal membuat reservasi.');
            }

            const invoice = {
                bookingId: data.booking.id,
                date: data.booking.visit_date,
                pax: data.booking.pax_count,
                destinationTitle: destData.title,
                ticketPrice: ticketPriceNum,
                includeDriver: data.booking.has_driver,
                driverPackage: data.booking.driver_package,
                driverPrice: data.booking.driver_price,
                driverName: (includeDriver && selectedDriver) ? selectedDriver.name : null,
                driverPhone: (includeDriver && selectedDriver) ? selectedDriver.phone : null,
                includeHotel: data.booking.include_hotel,
                hotelName: data.booking.selected_hotel,
                hotelPrice: data.booking.hotel_price,
                total: data.booking.total_amount_web,
                paymentStatus: data.booking.payment_status,
                snapToken: data.snap_token,
                selectedPayment: 'midtrans' // Track chosen payment method
            };

            setSuccessInvoice(invoice);

            if (data.snap_token) {
                if (data.snap_token.startsWith('mock-snap-token-')) {
                    invoice.paymentStatus = 'paid';
                    invoice.snapToken = 'MOCK_PAYMENT_SUCCESS';
                    setSuccessInvoice({ ...invoice });
                    setShowSuccessModal(true);

                    // Auto-open WhatsApp chat if driver was booked
                    if (includeDriver && selectedDriver) {
                        const waLink = getWhatsAppLink(invoice);
                        if (waLink) {
                            setTimeout(() => window.open(waLink, '_blank'), 600);
                        }
                    }
                    return;
                }

                if (!window.snap || !midtransReady) {
                    alert('Halaman pembayaran Midtrans sedang disiapkan. Silakan tunggu sebentar lalu coba kembali.');
                    return;
                }
                window.snap.pay(data.snap_token, {
                    onSuccess: function(result) {
                        invoice.paymentStatus = 'paid';
                        setSuccessInvoice({ ...invoice });
                        setShowSuccessModal(true);

                        if (includeDriver && selectedDriver) {
                            const waLink = getWhatsAppLink(invoice);
                            if (waLink) {
                                setTimeout(() => window.open(waLink, '_blank'), 600);
                            }
                        }
                    },
                    onPending: function(result) {
                        invoice.paymentStatus = 'pending';
                        setSuccessInvoice({ ...invoice });
                        setShowSuccessModal(true);
                    },
                    onError: function(result) {
                        alert('Pembayaran gagal dilakukan.');
                    },
                    onClose: function() {
                        invoice.paymentStatus = 'pending';
                        setSuccessInvoice({ ...invoice });
                        setShowSuccessModal(true);
                    }
                });
            } else {
                // Payment is 0 (No hotel/driver chosen)
                invoice.paymentStatus = 'paid';
                setSuccessInvoice({ ...invoice });
                setShowSuccessModal(true);
            }
        } catch (err) {
            alert(err.message || 'Terjadi kesalahan saat memproses booking.');
        }
    };

    const handleMockPayment = async () => {
        if (!successInvoice) return;

        try {
            const res = await fetch(`/api/v1/bookings/${successInvoice.bookingId}/mock-payment`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Pembayaran simulasi gagal diproses.');

            setSuccessInvoice({ ...successInvoice, paymentStatus: data.booking.payment_status });
            setShowMockPayment(false);
            setShowSuccessModal(true);
        } catch (err) {
            alert(err.message || 'Pembayaran simulasi gagal diproses.');
        }
    };

    const getWhatsAppLink = (inv) => {
        if (!inv) return '';
        const paymentStatusText = inv.paymentStatus === 'paid' ? 'LUNAS (Otomatis via Web)' : 'PENDING / MENUNGGU PEMBAYARAN';

        if (inv.includeDriver && inv.driverPhone) {
            // Direct message to the selected driver
            let msg = `Halo ${inv.driverName},\n\n`;
            msg += `Saya baru saja melakukan pemesanan supir lokal melalui TanaOgi untuk perjalanan saya:\n\n`;
            msg += `ID Transaksi: *${inv.bookingId}*\n`;
            msg += `Status Pembayaran: *${paymentStatusText}*\n`;
            msg += `Destinasi Tujuan: *${inv.destinationTitle}*\n`;
            msg += `Tanggal Rencana: *${inv.date}*\n`;
            msg += `Jumlah Orang: *${inv.pax} Pax*\n`;
            const pkgName = inv.driverPackage === 'point-to-point' ? 'Antar-Jemput' : inv.driverPackage === 'full-day' ? 'Full Day 12 Jam' : 'Multi-Day 3 Hari';
            msg += `Paket Supir: *${pkgName}*\n\n`;
            msg += `Mohon konfirmasi ketersediaan Anda untuk jadwal di atas. Terima kasih!`;

            let cleanedPhone = inv.driverPhone.replace(/[^0-9]/g, '');
            if (cleanedPhone.startsWith('0')) {
                cleanedPhone = '62' + cleanedPhone.slice(1);
            }
            return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(msg)}`;
        }

        let msg = `Halo TanaOgi Admin, saya ingin melakukan konfirmasi untuk pesanan reservasi berikut:\n\n`;
        msg += `ID Transaksi: *${inv.bookingId}*\n`;
        msg += `Status Pembayaran: *${paymentStatusText}*\n`;
        msg += `Destinasi Wisata: *${inv.destinationTitle}*\n`;
        msg += `Tanggal Kunjungan: *${inv.date}*\n`;
        msg += `Jumlah Pax: *${inv.pax} Pengunjung*\n`;
        msg += `Tiket Masuk (Tunai di Lokasi): *Rp ${(inv.ticketPrice * inv.pax).toLocaleString('id-ID')}*\n`;
        if (inv.includeDriver) {
            const pkgName = inv.driverPackage === 'point-to-point' ? 'Antar-Jemput' : inv.driverPackage === 'full-day' ? 'Full Day 12 Jam' : 'Multi-Day 3 Hari';
            msg += `Layanan Supir: *${pkgName}* (Rp ${inv.driverPrice.toLocaleString('id-ID')})\n`;
        }
        if (inv.includeHotel) {
            msg += `Akomodasi Hotel: *${inv.hotelName}* (Rp ${inv.hotelPrice.toLocaleString('id-ID')})\n`;
        }
        msg += `\n*TOTAL DIBAYAR VIA WEB*: *Rp ${inv.total.toLocaleString('id-ID')}*\n`;
        if (inv.snapToken) {
            msg += `Token Transaksi: ${inv.snapToken}\n`;
        }
        msg += `\nMohon diproses untuk persiapan perjalanan saya. Terima kasih!`;
        return `https://wa.me/628123456789?text=${encodeURIComponent(msg)}`;
    };
    

    
    const weatherData = weatherDataMap[activeId] || weatherDataMap[3];

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
                wishlistCount={wishlistCount}
                onWishlistToggle={onWishlistToggle}
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
                                            color: idx === 0 ? '#0f1a17' : '#5c4039',
                                            fontWeight: idx === 0 ? 500 : 400
                                        }}
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </section>



                        {/* Section 2: Narrative Subsections */}
                        <section style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                            {/* Keindahan Alam */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <h3 className="text-forest" style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Keindahan Alam</h3>
                                <p style={{ fontSize: '18px', color: '#0f1a17', lineHeight: 1.6 }}>
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
                                            <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#0f1a17', margin: 0, lineHeight: 1.5 }}>
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
                                        color: '#0f1a17',
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
                                        e.currentTarget.style.color = '#0f1a17';
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

                                                {/* ── Step-by-Step Booking Wizard (TanaOgi Light Theme) ── */}
                        <section ref={bookingWidgetRef} id="booking-wizard-section" style={{
                            backgroundColor: '#ffffff', 
                            color: '#0f1a17',
                            padding: '24px', 
                            borderRadius: '16px', 
                            border: '1.5px solid #e4f0ed',
                            boxShadow: '0 12px 35px -8px rgba(15, 26, 23, 0.06)',
                            fontFamily: font,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            {/* Wizard Header / Step Progress Indicator */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#f5401b', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                                        Langkah {bookingStep} dari 4
                                    </span>
                                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#0f1a17' }}>Pemesanan Perjalanan</span>
                                </div>
                                
                                {/* Progress Bar */}
                                <div style={{ display: 'flex', gap: '6px', height: '4px', width: '100%', backgroundColor: '#e4f0ed', borderRadius: '9999px', overflow: 'hidden' }}>
                                    <div style={{ width: `${(bookingStep / 4) * 100}%`, height: '100%', backgroundColor: '#f5401b', transition: 'width 0.4s ease-out' }} />
                                </div>

                                {/* Step Titles */}
                                <div className="grid grid-cols-4 gap-1 text-center" style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    <span style={{ color: bookingStep >= 1 ? '#f5401b' : 'rgba(15, 26, 23, 0.4)' }}>1. Kunjungan</span>
                                    <span style={{ color: bookingStep >= 2 ? '#f5401b' : 'rgba(15, 26, 23, 0.4)' }}>2. Transport</span>
                                    <span style={{ color: bookingStep >= 3 ? '#f5401b' : 'rgba(15, 26, 23, 0.4)' }}>3. Akomodasi</span>
                                    <span style={{ color: bookingStep >= 4 ? '#f5401b' : 'rgba(15, 26, 23, 0.4)' }}>4. Konfirmasi</span>
                                </div>
                            </div>

                            {/* Wizard Body - Step Contents */}
                            <div style={{ minHeight: '220px' }}>
                                {/* STEP 1: VISIT DETAILS */}
                                {bookingStep === 1 && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f1a17', margin: 0 }}>Kapan Anda akan berkunjung?</h3>
                                        <p style={{ fontSize: '13px', color: 'rgba(15, 26, 23, 0.65)', margin: 0 }}>
                                            Tentukan tanggal kunjungan Anda ke {destData.title} serta jumlah anggota perjalanan Anda.
                                        </p>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '4px' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#0f1a17', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tanggal Kunjungan</label>
                                                <input 
                                                    type="date" 
                                                    value={visitDate}
                                                    onChange={e => setVisitDate(e.target.value)}
                                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(15, 26, 23, 0.12)', fontFamily: font, fontSize: '14px', color: '#0f1a17', backgroundColor: '#ffffff', outline: 'none' }}
                                                />
                                            </div>

                                            <div>
                                                <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#0f1a17', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Jumlah Pengunjung</label>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', border: '1px solid rgba(15, 26, 23, 0.12)', padding: '6px 12px', borderRadius: '8px', backgroundColor: '#ffffff' }}>
                                                    <button 
                                                        onClick={() => setPaxCount(p => Math.max(1, p - 1))}
                                                        style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', backgroundColor: '#f5401b', color: '#ffffff', fontSize: '18px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                    >-</button>
                                                    <span style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '15px', color: '#0f1a17' }}>{paxCount} Orang</span>
                                                    <button 
                                                        onClick={() => setPaxCount(p => Math.min(20, p + 1))}
                                                        style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', backgroundColor: '#f5401b', color: '#ffffff', fontSize: '18px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                    >+</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                            <button 
                                                onClick={() => setBookingStep(2)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f5401b', color: '#ffffff', padding: '12px 28px', borderRadius: '9999px', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 6px 18px rgba(245, 64, 27, 0.15)' }}
                                            >
                                                Lanjut ke Transportasi
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2: TRANSPORTATION LOGIC */}
                                {bookingStep === 2 && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f1a17', margin: 0 }}>Bagaimana Anda menuju ke lokasi?</h3>
                                        <p style={{ fontSize: '13px', color: 'rgba(15, 26, 23, 0.65)', margin: 0 }}>
                                            Pilih opsi memiliki kendaraan mandiri untuk petunjuk rute, atau gunakan jasa supir lokal profesional kami.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ marginTop: '4px' }}>
                                            <div 
                                                onClick={() => { setIncludeDriver(false); setDriverPackage('full-day'); }}
                                                style={{
                                                    padding: '16px',
                                                    borderRadius: '12px',
                                                    backgroundColor: '#ffffff',
                                                    border: (!includeDriver) ? '2px solid #f5401b' : '1px solid rgba(15, 26, 23, 0.1)',
                                                    textAlign: 'left',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <span className="material-symbols-outlined" style={{ color: '#f5401b', fontSize: '28px', display: 'block', marginBottom: '8px' }}>directions_car</span>
                                                <span style={{ display: 'block', fontWeight: 800, fontSize: '15px', color: '#0f1a17', marginBottom: '2px' }}>Ya, Punya Kendaraan</span>
                                                <span style={{ fontSize: '11px', color: 'rgba(15, 26, 23, 0.55)' }}>Navigasi mandiri ke destinasi wisata.</span>
                                            </div>

                                            <div 
                                                onClick={() => { setIncludeDriver(true); }}
                                                style={{
                                                    padding: '16px',
                                                    borderRadius: '12px',
                                                    backgroundColor: '#ffffff',
                                                    border: (includeDriver) ? '2px solid #f5401b' : '1px solid rgba(15, 26, 23, 0.1)',
                                                    textAlign: 'left',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <span className="material-symbols-outlined" style={{ color: '#f5401b', fontSize: '28px', display: 'block', marginBottom: '8px' }}>hail</span>
                                                <span style={{ display: 'block', fontWeight: 800, fontSize: '15px', color: '#0f1a17', marginBottom: '2px' }}>Tidak, Butuh Driver</span>
                                                <span style={{ fontSize: '11px', color: 'rgba(15, 26, 23, 0.55)' }}>Sewa armada dengan supir lokal.</span>
                                            </div>
                                        </div>

                                        {includeDriver && (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px', padding: '16px', backgroundColor: '#e4f0ed', borderRadius: '12px', border: '1px solid rgba(15, 26, 23, 0.05)' }}>
                                                <div>
                                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 700, color: '#0f1a17' }}>Pilih Paket Driver</h4>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                        {[
                                                            { id: 'point-to-point', title: 'Antar-Jemput (One-Way)', price: 'Rp 450.000', icon: 'local_taxi' },
                                                            { id: 'full-day', title: 'Full Day Service (12 Jam)', price: 'Rp 750.000', icon: 'schedule' },
                                                            { id: 'multi-day', title: 'Multi-Day (3 Hari)', price: 'Rp 2.000.000', icon: 'explore' }
                                                        ].map((pkg) => (
                                                            <div 
                                                                key={pkg.id}
                                                                onClick={() => setDriverPackage(pkg.id)}
                                                                style={{
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '8px',
                                                                    border: driverPackage === pkg.id ? '1.5px solid #f5401b' : '1px solid rgba(15, 26, 23, 0.08)',
                                                                    backgroundColor: driverPackage === pkg.id ? 'rgba(245, 64, 27, 0.04)' : '#ffffff',
                                                                    cursor: 'pointer', transition: 'all 0.2s', fontSize: '13px'
                                                                }}
                                                            >
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                    <span className="material-symbols-outlined" style={{ color: driverPackage === pkg.id ? '#f5401b' : '#0f1a17', fontSize: '20px' }}>{pkg.icon}</span>
                                                                    <span style={{ fontWeight: 700, color: '#0f1a17' }}>{pkg.title}</span>
                                                                </div>
                                                                <span style={{ fontWeight: 800, color: '#f5401b' }}>{pkg.price}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div style={{ borderTop: '1px solid rgba(15, 26, 23, 0.1)', paddingTop: '14px' }}>
                                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 700, color: '#0f1a17' }}>Pilih Supir Lokal Pilihan Anda</h4>
                                                    {drivers.length > 0 ? (
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                            {drivers.map((dr) => (
                                                                <div 
                                                                    key={dr.id}
                                                                    onClick={() => setSelectedDriver(dr)}
                                                                    style={{
                                                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '8px',
                                                                        border: selectedDriver?.id === dr.id ? '1.5px solid #f5401b' : '1px solid rgba(15, 26, 23, 0.08)',
                                                                        backgroundColor: selectedDriver?.id === dr.id ? 'rgba(245, 64, 27, 0.04)' : '#ffffff',
                                                                        cursor: 'pointer', transition: 'all 0.2s', fontSize: '13px'
                                                                    }}
                                                                >
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                        <span className="material-symbols-outlined" style={{ color: selectedDriver?.id === dr.id ? '#f5401b' : '#0f1a17', fontSize: '24px' }}>
                                                                            {dr.vehicle_type === 'bus' ? 'directions_bus' : 'directions_car'}
                                                                        </span>
                                                                        <div>
                                                                            <span style={{ fontWeight: 700, color: '#0f1a17', display: 'block' }}>{dr.name}</span>
                                                                            <span style={{ fontSize: '11px', color: '#5c4039' }}>
                                                                                Layanan: {dr.vehicle_type === 'bus' ? 'Bus Pariwisata' : 'Mobil Standar'} • WA: {dr.phone}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    {selectedDriver?.id === dr.id && (
                                                                        <span style={{ fontSize: '9px', backgroundColor: '#f5401b', color: '#ffffff', padding: '2px 6px', borderRadius: '3px', fontWeight: 800 }}>TERPILIH</span>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div style={{ fontSize: '12px', color: 'rgba(15, 26, 23, 0.5)', padding: '10px', textAlign: 'center' }}>
                                                            Memuat data supir lokal...
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                            <button 
                                                onClick={() => setBookingStep(1)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'transparent', color: '#0f1a17', padding: '10px 20px', borderRadius: '9999px', fontWeight: 700, fontSize: '13px', border: '1px solid rgba(15, 26, 23, 0.15)', cursor: 'pointer' }}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
                                                Kembali
                                            </button>
                                            <button 
                                                onClick={() => setBookingStep(3)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f5401b', color: '#ffffff', padding: '12px 28px', borderRadius: '9999px', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 6px 18px rgba(245, 64, 27, 0.15)' }}
                                            >
                                                Lanjut ke Akomodasi
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: ACCOMMODATION (OPTIONAL) */}
                                {bookingStep === 3 && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f1a17', margin: 0 }}>Pilih Kamar Penginapan (Opsional)</h3>
                                        <p style={{ fontSize: '13px', color: 'rgba(15, 26, 23, 0.65)', margin: 0 }}>
                                            Tambahkan kenyamanan dengan memesan penginapan pilihan terpopuler. Anda bisa melewati langkah ini jika tidak menginap.
                                        </p>

                                        {/* Show Map Navigator for self-driving users */}
                                        {!includeDriver && (
                                            <div style={{ padding: '12px 16px', backgroundColor: 'rgba(245, 64, 27, 0.04)', borderRadius: '12px', border: '1px solid rgba(245, 64, 27, 0.1)', marginBottom: '4px' }}>
                                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                                                    <span className="material-symbols-outlined" style={{ color: '#f5401b', fontSize: '18px' }}>navigation</span>
                                                    <span style={{ fontWeight: 800, fontSize: '13px', color: '#f5401b' }}>Panduan Rute Mandiri Aktif</span>
                                                </div>
                                                <p style={{ fontSize: '11px', color: 'rgba(15, 26, 23, 0.7)', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                                                    Karena Anda berkendara sendiri, silakan periksa jarak dan rute ke lokasi.
                                                </p>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <button 
                                                        onClick={handleRequestGPS}
                                                        style={{ backgroundColor: '#0f1a17', color: '#ffffff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                                    >
                                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>my_location</span>
                                                        {gpsStatus === 'loading' ? 'Mendeteksi...' : 'Jarak GPS'}
                                                    </button>
                                                    <button 
                                                        onClick={handleOpenMapsNavigation}
                                                        style={{ backgroundColor: '#f5401b', color: '#ffffff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                                    >
                                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>map</span>
                                                        Google Maps
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Hotels Selection Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ marginTop: '4px' }}>
                                            {allHotels.map((h, idx) => {
                                                const isSelected = includeHotel && selectedHotel === h.name;
                                                return (
                                                    <div 
                                                        key={idx} 
                                                        onClick={() => {
                                                            setIncludeHotel(true);
                                                            setSelectedHotel(h.name);
                                                        }}
                                                        style={{ 
                                                            backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', 
                                                            border: isSelected ? '2px solid #f5401b' : '1px solid rgba(15, 26, 23, 0.1)', 
                                                            transition: 'all 0.2s', cursor: 'pointer' 
                                                        }}
                                                        className="group"
                                                    >
                                                        {h.image ? (
                                                            <div style={{ height: '90px', overflow: 'hidden' }}>
                                                                <img src={h.image} alt={h.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            </div>
                                                        ) : (
                                                            <div style={{ height: '90px', background: h.bg || 'linear-gradient(135deg, #0f1a17, #f5401b)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#ffffff', opacity: 0.6 }}>hotel</span>
                                                            </div>
                                                        )}
                                                        <div style={{ padding: '10px 12px' }}>
                                                            <h4 style={{ fontWeight: 700, fontSize: '13px', margin: 0, color: '#0f1a17' }}>{h.name}</h4>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                                                                <span style={{ fontSize: '11px', color: '#f5401b', fontWeight: 700 }}>{h.price} <span style={{ fontSize: '9px', fontWeight: 400, color: 'rgba(15, 26, 23, 0.5)' }}>/malam</span></span>
                                                                {isSelected && (
                                                                    <span style={{ fontSize: '9px', backgroundColor: '#f5401b', color: '#ffffff', padding: '2px 6px', borderRadius: '3px', fontWeight: 800 }}>TERPILIH</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                            <button 
                                                onClick={() => setBookingStep(2)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'transparent', color: '#0f1a17', padding: '10px 20px', borderRadius: '9999px', fontWeight: 700, fontSize: '13px', border: '1px solid rgba(15, 26, 23, 0.15)', cursor: 'pointer' }}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
                                                Kembali
                                            </button>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button 
                                                    onClick={() => { setIncludeHotel(false); setSelectedHotel(''); setBookingStep(4); }}
                                                    style={{ backgroundColor: 'transparent', color: '#0f1a17', padding: '10px 18px', borderRadius: '9999px', fontWeight: 700, fontSize: '13px', border: '1px solid rgba(15, 26, 23, 0.15)', cursor: 'pointer' }}
                                                >
                                                    Lewati
                                                </button>
                                                <button 
                                                    onClick={() => setBookingStep(4)}
                                                    style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f5401b', color: '#ffffff', padding: '12px 28px', borderRadius: '9999px', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 6px 18px rgba(245, 64, 27, 0.15)' }}
                                                >
                                                    Lanjut
                                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 4: SUMMARY & CONFIRMATION */}
                                {bookingStep === 4 && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f1a17', margin: 0 }}>Ringkasan &amp; Konfirmasi</h3>
                                        <p style={{ fontSize: '13px', color: 'rgba(15, 26, 23, 0.65)', margin: 0 }}>
                                            Periksa kembali rincian pemesanan Anda sebelum melakukan konfirmasi akhir.
                                        </p>

                                        {/* Contact Person Details Inputs */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', backgroundColor: '#e4f0ed', borderRadius: '12px', border: '1px solid rgba(15, 26, 23, 0.05)' }}>
                                            <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f1a17', margin: '0 0 4px 0' }}>Informasi Kontak Pengunjung</h4>
                                            
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <label style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(15, 26, 23, 0.6)', textTransform: 'uppercase' }}>Nama Lengkap</label>
                                                <input 
                                                    type="text" 
                                                    value={customerName} 
                                                    onChange={e => setCustomerName(e.target.value)}
                                                    placeholder="Masukkan nama lengkap kontak"
                                                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid rgba(15, 26, 23, 0.1)', fontSize: '13px', fontFamily: font, color: '#0f1a17', backgroundColor: '#ffffff' }}
                                                />
                                            </div>
                                            
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <label style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(15, 26, 23, 0.6)', textTransform: 'uppercase' }}>Nomor WhatsApp</label>
                                                <input 
                                                    type="text" 
                                                    value={customerPhone} 
                                                    onChange={e => setCustomerPhone(e.target.value)}
                                                    placeholder="Contoh: 628123456789"
                                                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid rgba(15, 26, 23, 0.1)', fontSize: '13px', fontFamily: font, color: '#0f1a17', backgroundColor: '#ffffff' }}
                                                />
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <label style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(15, 26, 23, 0.6)', textTransform: 'uppercase' }}>Catatan Tambahan (Opsional)</label>
                                                <textarea 
                                                    value={bookingNotes} 
                                                    onChange={e => setBookingNotes(e.target.value)}
                                                    placeholder="Tulis instruksi penjemputan atau permintaan khusus..."
                                                    rows={2}
                                                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid rgba(15, 26, 23, 0.1)', fontSize: '13px', fontFamily: font, color: '#0f1a17', backgroundColor: '#ffffff', resize: 'none' }}
                                                />
                                            </div>


                                        </div>



                                        {/* Ticket payment cash location notice */}
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: 'rgba(245, 64, 27, 0.07)', color: '#f5401b', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(245, 64, 27, 0.15)', fontSize: '11px', lineHeight: 1.4 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#f5401b' }}>warning</span>
                                            <span>Penting: Tiket masuk senilai Rp {(parsePrice(destData.price) * paxCount).toLocaleString('id-ID')} dibayar tunai langsung di lokasi destinasi wisata (tidak melalui web).</span>
                                        </div>

                                        <div style={{ backgroundColor: '#e4f0ed', borderRadius: '12px', padding: '16px', border: '1px solid rgba(15, 26, 23, 0.05)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                                                <span style={{ color: 'rgba(15, 26, 23, 0.6)' }}>Destinasi</span>
                                                <span style={{ fontWeight: 700, color: '#0f1a17' }}>{destData.title}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                                                <span style={{ color: 'rgba(15, 26, 23, 0.6)' }}>Rencana Tanggal</span>
                                                <span style={{ fontWeight: 700, color: '#0f1a17' }}>{visitDate}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                                                <span style={{ color: 'rgba(15, 26, 23, 0.6)' }}>Jumlah Pengunjung</span>
                                                <span style={{ fontWeight: 700, color: '#0f1a17' }}>{paxCount} Pax</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', borderBottom: '1px solid rgba(15, 26, 23, 0.08)', paddingBottom: '8px', color: 'rgba(15, 26, 23, 0.6)' }}>
                                                <span>Tiket Masuk ({paxCount}x - Bayar di Lokasi)</span>
                                                <span style={{ fontWeight: 700 }}>Rp {(parsePrice(destData.price) * paxCount).toLocaleString('id-ID')}</span>
                                            </div>

                                            {includeDriver && (
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', borderBottom: '1px solid rgba(15, 26, 23, 0.08)', paddingBottom: '8px' }}>
                                                    <span style={{ color: 'rgba(15, 26, 23, 0.6)' }}>
                                                        Supir Lokal: {driverPackage === 'point-to-point' ? 'Antar-Jemput' : driverPackage === 'full-day' ? 'Full Day 12 Jam' : 'Multi-Day 3 Hari'}
                                                    </span>
                                                    <span style={{ fontWeight: 700, color: '#f5401b' }}>
                                                        Rp {(driverPackage === 'point-to-point' ? 450000 : driverPackage === 'full-day' ? 750000 : 2000000).toLocaleString('id-ID')}
                                                    </span>
                                                </div>
                                            )}

                                            {includeHotel && selectedHotel && (
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', borderBottom: '1px solid rgba(15, 26, 23, 0.08)', paddingBottom: '8px' }}>
                                                    <span style={{ color: 'rgba(15, 26, 23, 0.6)' }}>Penginapan: {selectedHotel}</span>
                                                    <span style={{ fontWeight: 700, color: '#f5401b' }}>
                                                        Rp {(allHotels.find(h => h.name === selectedHotel) ? parsePrice(allHotels.find(h => h.name === selectedHotel).price) : 0).toLocaleString('id-ID')}
                                                    </span>
                                                </div>
                                            )}

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '12px' }}>
                                                <span style={{ fontWeight: 800, fontSize: '14px', color: '#0f1a17' }}>Total Bayar (via Web)</span>
                                                <span style={{ fontWeight: 800, fontSize: '20px', color: '#f5401b' }}>
                                                    Rp {(
                                                        (includeDriver ? (driverPackage === 'point-to-point' ? 450000 : driverPackage === 'full-day' ? 750000 : 2000000) : 0) +
                                                        ((includeHotel && allHotels.find(h => h.name === selectedHotel)) ? parsePrice(allHotels.find(h => h.name === selectedHotel).price) : 0)
                                                    ).toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                            <button 
                                                onClick={() => setBookingStep(3)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'transparent', color: '#0f1a17', padding: '10px 20px', borderRadius: '9999px', fontWeight: 700, fontSize: '13px', border: '1px solid rgba(15, 26, 23, 0.2)', cursor: 'pointer' }}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
                                                Kembali
                                            </button>
                                            <button 
                                                onClick={handleConfirmBooking}
                                                style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f5401b', color: '#ffffff', padding: '12px 28px', borderRadius: '9999px', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 6px 18px rgba(245, 64, 27, 0.15)' }}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check_circle</span>
                                                {hasWebPayment ? 'Lanjut ke Pembayaran' : 'Konfirmasi Pemesanan'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
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
                                    
                                </div>

                                {/* Quick Action Buttons */}
                                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                                
                                {/* ── Premium Weather & Packing Widget ── */}
                                <div style={{ 
                                    marginTop: '24px', 
                                    padding: '24px', 
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    borderRadius: '24px',
                                    border: '1px solid rgba(255, 255, 255, 0.5)',
                                    boxShadow: '0 15px 30px -10px rgba(15, 26, 23, 0.06)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                        <h4 className="text-forest" style={{ fontSize: '16px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#f5401b', fontSize: '20px' }}>thermostat</span>
                                            Cuaca &amp; Tips Bawaan
                                        </h4>
                                        <span style={{ fontSize: '10px', color: '#5c4039', fontWeight: 600 }}>Live Update</span>
                                    </div>

                                    {/* Main Weather Display */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', padding: '16px', backgroundColor: 'rgba(245, 64, 27, 0.04)', borderRadius: '16px' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#b32000', fontSize: '48px' }}>
                                            {weatherData.icon}
                                        </span>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                                <span style={{ fontSize: '32px', fontWeight: 800, color: '#131e1b', lineHeight: 1 }}>{weatherData.temp}</span>
                                            </div>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#f5401b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                {weatherData.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Tab Navigation */}
                                    <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px', marginBottom: '16px' }}>
                                        {[
                                            { id: 'today', label: 'Hari Ini' },
                                            { id: 'forecast', label: 'Prakiraan' },
                                            { id: 'packing', label: 'Tips Bawaan' }
                                        ].map(tab => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setWeatherTab(tab.id)}
                                                style={{
                                                    flex: 1,
                                                    padding: '8px 4px',
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    backgroundColor: weatherTab === tab.id ? '#f5401b' : 'transparent',
                                                    color: weatherTab === tab.id ? '#ffffff' : 'rgba(15, 26, 23, 0.7)',
                                                    fontWeight: 700,
                                                    fontSize: '11px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Tab Content Panels */}
                                    <div style={{ minHeight: '130px' }}>
                                        {/* Today Tab */}
                                        {weatherTab === 'today' && (
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
                                                <div style={{ padding: '12px 4px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#5c4039', display: 'block', marginBottom: '4px' }}>device_thermostat</span>
                                                    <span style={{ fontSize: '9px', color: '#5c4039', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Terasa</span>
                                                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#131e1b' }}>{weatherData.feelsLike}</span>
                                                </div>
                                                <div style={{ padding: '12px 4px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#5c4039', display: 'block', marginBottom: '4px' }}>humidity_percentage</span>
                                                    <span style={{ fontSize: '9px', color: '#5c4039', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lembab</span>
                                                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#131e1b' }}>{weatherData.humidity}</span>
                                                </div>
                                                <div style={{ padding: '12px 4px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#5c4039', display: 'block', marginBottom: '4px' }}>wind_power</span>
                                                    <span style={{ fontSize: '9px', color: '#5c4039', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Angin</span>
                                                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#131e1b' }}>{weatherData.wind}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Forecast Tab */}
                                        {weatherTab === 'forecast' && (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                {weatherData.forecast.map((fc, idx) => (
                                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <span className="material-symbols-outlined" style={{ color: '#f5401b', fontSize: '24px' }}>{fc.icon}</span>
                                                            <div>
                                                                <span style={{ fontWeight: 700, fontSize: '13px', color: '#131e1b', display: 'block' }}>{fc.day}</span>
                                                                <span style={{ fontSize: '11px', color: '#5c4039' }}>{fc.status}</span>
                                                            </div>
                                                        </div>
                                                        <span style={{ fontWeight: 800, fontSize: '15px', color: '#b32000', marginLeft: 'auto' }}>{fc.temp}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Packing Tab */}
                                        {weatherTab === 'packing' && (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {weatherData.packing.map((pack, idx) => (
                                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '8px', fontSize: '12px', color: '#0f1a17', fontWeight: 600, border: '1px solid rgba(0,0,0,0.02)' }}>
                                                        <span className="material-symbols-outlined" style={{ color: '#b32000', fontSize: '16px' }}>check_circle</span>
                                                        <span>{pack}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                      </div>
                                    </div>
                            </div>

                            {/* ── NEW Map Card (TanaOgi Custom Theme) ── */}
                            <div className="glass-panel" style={{ 
                                padding: '24px', 
                                borderRadius: '24px', 
                                backgroundColor: '#ffffff', 
                                border: '1.5px solid #e4f0ed', 
                                boxShadow: '0 12px 35px -8px rgba(15, 26, 23, 0.06)',
                                fontFamily: font,
                                color: '#0f1a17',
                                marginTop: '24px'
                            }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 16px 0', color: '#0f1a17', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#f5401b' }}>map</span>
                                    Navigasi Rute
                                </h3>

                                {/* Map Switcher Tabs */}
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                    <button 
                                        onClick={() => setActiveMapTab('destination')}
                                        style={{
                                            flex: 1,
                                            padding: '8px 12px',
                                            borderRadius: '8px',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            border: activeMapTab === 'destination' ? 'none' : '1px solid rgba(15, 26, 23, 0.15)',
                                            backgroundColor: activeMapTab === 'destination' ? '#f5401b' : 'transparent',
                                            color: activeMapTab === 'destination' ? '#ffffff' : '#0f1a17',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        Map Destinasi
                                    </button>
                                    <button 
                                        onClick={() => {
                                            if (includeHotel && selectedHotel) {
                                                setActiveMapTab('hotel');
                                            }
                                        }}
                                        disabled={!includeHotel || !selectedHotel}
                                        style={{
                                            flex: 1,
                                            padding: '8px 12px',
                                            borderRadius: '8px',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            cursor: (includeHotel && selectedHotel) ? 'pointer' : 'not-allowed',
                                            border: activeMapTab === 'hotel' ? 'none' : '1px solid rgba(15, 26, 23, 0.15)',
                                            backgroundColor: activeMapTab === 'hotel' ? '#f5401b' : 'transparent',
                                            color: activeMapTab === 'hotel' ? '#ffffff' : 'rgba(15, 26, 23, 0.4)',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        Map Penginapan
                                    </button>
                                </div>

                                {/* Map View Frame */}
                                <div style={{ width: '100%', height: '200px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(15, 26, 23, 0.08)', backgroundColor: '#e4f0ed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {activeMapTab === 'destination' ? (
                                        <iframe
                                            title="Peta Destinasi"
                                            src={mapEmbedUrl}
                                            style={{ width: '100%', height: '100%', border: '0' }}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    ) : (
                                        includeHotel && selectedHotel ? (
                                            <iframe
                                                title="Peta Penginapan"
                                                src={`https://www.google.com/maps?q=${encodeURIComponent(selectedHotel + ', ' + destData.title)}&z=14&output=embed`}
                                                style={{ width: '100%', height: '100%', border: '0' }}
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        ) : (
                                            <div style={{ padding: '20px', textAlign: 'center', color: 'rgba(15, 26, 23, 0.5)', fontSize: '12px' }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>hotel</span>
                                                Pilih penginapan pada langkah pemesanan untuk menampilkan peta.
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* Location Coordinates & Details */}
                                <div style={{ marginTop: '12px', fontSize: '11px', color: 'rgba(15, 26, 23, 0.6)' }}>
                                    {activeMapTab === 'destination' ? (
                                        <span>Koordinat Destinasi: {destCoords.lat.toFixed(5)}, {destCoords.lng.toFixed(5)}</span>
                                    ) : (
                                        <span>Koordinat Penginapan: Terpusat di area {destData.title}</span>
                                    )}
                                </div>

                                {/* Travel Estimation & GPS Block (Integrated) */}
                                <div style={{ borderTop: '1px solid rgba(15, 26, 23, 0.08)', marginTop: '16px', paddingTop: '16px' }}>
                                    {gpsStatus === 'success' && distanceToDestination !== null ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ backgroundColor: 'rgba(245, 64, 27, 0.1)', padding: '6px', borderRadius: '8px' }}>
                                                    <span className="material-symbols-outlined" style={{ color: '#f5401b', fontSize: '18px' }}>near_me</span>
                                                </div>
                                                <div>
                                                    <span style={{ display: 'block', fontWeight: 800, fontSize: '16px', color: '#f5401b', lineHeight: 1 }}>
                                                        {distanceToDestination < 1
                                                            ? `${Math.round(distanceToDestination * 1000)} m`
                                                            : `${distanceToDestination.toFixed(1)} km`}
                                                    </span>
                                                    <span style={{ fontSize: '10px', color: 'rgba(15, 26, 23, 0.6)' }}>Jarak dari lokasi Anda</span>
                                                </div>
                                            </div>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', backgroundColor: '#e4f0ed', borderRadius: '8px' }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#f5401b' }}>schedule</span>
                                                <span style={{ fontSize: '12px', color: '#0f1a17', fontWeight: 700 }}>
                                                    Est. Tiba: {estimateTravelTime(distanceToDestination)} berkendara
                                                </span>
                                            </div>
                                            
                                            <button
                                                onClick={handleRequestGPS}
                                                style={{ fontSize: '10px', color: '#f5401b', fontWeight: 800, textDecoration: 'underline', border: 'none', background: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', marginTop: '4px' }}
                                            >
                                                Perbarui Lokasi GPS
                                            </button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                                <span style={{ color: 'rgba(15, 26, 23, 0.6)' }}>Jarak Rata-rata</span>
                                                <span style={{ fontWeight: 700, color: '#0f1a17' }}>{destData.sidebarInfo.jarakMakassar}</span>
                                            </div>
                                            
                                            {gpsStatus === 'loading' ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'rgba(15, 26, 23, 0.6)' }}>
                                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #f5401b', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
                                                    <span>Mengalkulasi jarak rute Anda...</span>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={handleRequestGPS}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '6px',
                                                        width: '100%',
                                                        padding: '10px',
                                                        borderRadius: '8px',
                                                        border: '1px dashed #f5401b',
                                                        backgroundColor: 'rgba(245, 64, 27, 0.03)',
                                                        color: '#f5401b',
                                                        fontWeight: 700,
                                                        fontSize: '12px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(245, 64, 27, 0.08)'}
                                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(245, 64, 27, 0.03)'}
                                                >
                                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>my_location</span>
                                                    Deteksi Jarak GPS Saya
                                                </button>
                                            )}
                                        </div>
                                    )}
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



            {/* Booking Success Modal (TanaOgi Light Theme - Compact) */}
            {showSuccessModal && successInvoice && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(15, 26, 23, 0.6)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        padding: '24px',
                        width: '90%',
                        maxWidth: '440px',
                        boxShadow: '0 20px 45px -10px rgba(15, 26, 23, 0.2)',
                        border: '1.5px solid rgba(15, 26, 23, 0.08)',
                        animation: 'modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        maxHeight: '85vh',
                        overflowY: 'auto',
                        color: '#0f1a17'
                    }}>
                        {/* Animated Check Icon */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                            <div style={{
                                width: '56px', height: '56px', borderRadius: '50%',
                                backgroundColor: 'rgba(245, 64, 27, 0.1)', border: '2.5px solid #f5401b',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <span className="material-symbols-outlined" style={{ color: '#f5401b', fontSize: '32px', fontWeight: 'bold' }}>check</span>
                            </div>
                        </div>

                        <h2 style={{ textAlign: 'center', fontSize: '20px', fontWeight: 800, color: '#0f1a17', margin: '0 0 6px 0' }}>Booking Berhasil!</h2>
                        <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(15, 26, 23, 0.65)', margin: '0 0 20px 0' }}>
                            {successInvoice.paymentStatus === 'paid'
                                ? 'Pembayaran layanan tambahan telah tercatat. Tiket wisata tetap dibayar tunai di lokasi.'
                                : 'Pembayaran layanan tambahan masih menunggu. Tiket wisata tetap dibayar tunai di lokasi.'}
                        </p>

                        {/* Invoice Details */}
                        <div style={{ backgroundColor: '#e4f0ed', borderRadius: '12px', padding: '16px', border: '1px solid rgba(15, 26, 23, 0.06)', marginBottom: '20px', fontSize: '13px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: 'rgba(15, 26, 23, 0.55)' }}>Status Pembayaran</span>
                                <span style={{ 
                                    fontWeight: 800, 
                                    color: '#0f1a17',
                                    backgroundColor: successInvoice.paymentStatus === 'paid' ? '#23f7db' : 'rgba(245, 64, 27, 0.15)',
                                    padding: '3px 10px',
                                    borderRadius: '6px',
                                    fontSize: '11px'
                                }}>
                                    {successInvoice.paymentStatus === 'paid' ? 'LUNAS (PROSES)' : 'MENUNGGU PEMBAYARAN'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: 'rgba(15, 26, 23, 0.55)' }}>ID Transaksi</span>
                                <span style={{ fontWeight: 700, color: '#0f1a17', fontSize: '11px' }}>{successInvoice.bookingId}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: 'rgba(15, 26, 23, 0.55)' }}>Tanggal Rencana</span>
                                <span style={{ fontWeight: 700, color: '#0f1a17' }}>{successInvoice.date}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: 'rgba(15, 26, 23, 0.55)' }}>Destinasi</span>
                                <span style={{ fontWeight: 700, color: '#0f1a17' }}>{successInvoice.destinationTitle}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: 'rgba(15, 26, 23, 0.55)' }}>Jumlah Tiket (Lokasi)</span>
                                <span style={{ fontWeight: 700, color: '#0f1a17' }}>{successInvoice.pax} Pax (Rp {(successInvoice.ticketPrice * successInvoice.pax).toLocaleString('id-ID')})</span>
                            </div>
                            {successInvoice.includeDriver && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ color: 'rgba(15, 26, 23, 0.55)' }}>Layanan Supir (Web)</span>
                                    <span style={{ fontWeight: 700, color: '#0f1a17' }}>Rp {successInvoice.driverPrice.toLocaleString('id-ID')}</span>
                                </div>
                            )}
                            {successInvoice.includeHotel && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ color: 'rgba(15, 26, 23, 0.55)' }}>Kamar Hotel (Web)</span>
                                    <span style={{ fontWeight: 700, color: '#0f1a17' }}>{successInvoice.hotelName.substring(0, 16)}... (Rp {successInvoice.hotelPrice.toLocaleString('id-ID')})</span>
                                </div>
                            )}
                            <div style={{ height: '1px', backgroundColor: 'rgba(15, 26, 23, 0.08)', margin: '10px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <span style={{ fontWeight: 700, color: '#0f1a17' }}>Total Tagihan Web</span>
                                <span style={{ fontWeight: 800, fontSize: '18px', color: '#f5401b' }}>Rp {successInvoice.total.toLocaleString('id-ID')}</span>
                            </div>
                        </div>


                        {/* Barcode/QR Code Simulation */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', gap: '3px', height: '36px', alignItems: 'stretch' }}>
                                {[4,2,3,1,4,2,1,3,4,1,2,4,2,3,1,4,2,1,3,4].map((width, idx) => (
                                    <div key={idx} style={{ width: `${width}px`, backgroundColor: '#0f1a17' }} />
                                ))}
                            </div>
                            <span style={{ fontSize: '9px', letterSpacing: '0.4em', color: 'rgba(15, 26, 23, 0.45)', fontFamily: 'monospace' }}>{successInvoice.bookingId}</span>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <a
                                href={getWhatsAppLink(successInvoice)}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    backgroundColor: '#f5401b', color: '#ffffff', padding: '12px', borderRadius: '9999px',
                                    fontWeight: 700, fontSize: '13px', textDecoration: 'none', cursor: 'pointer',
                                    boxShadow: '0 6px 15px rgba(245, 64, 27, 0.15)', textAlign: 'center'
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>chat</span>
                                {successInvoice.includeDriver && successInvoice.driverPhone 
                                    ? `Hubungi Driver (${successInvoice.driverName}) via WhatsApp` 
                                    : 'Hubungi Admin via WhatsApp'}
                            </a>
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                style={{
                                    backgroundColor: 'transparent', color: '#0f1a17', padding: '10px', borderRadius: '9999px',
                                    fontWeight: 700, fontSize: '13px', border: '1px solid rgba(15, 26, 23, 0.15)', cursor: 'pointer'
                                }}
                            >
                                Selesai
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
