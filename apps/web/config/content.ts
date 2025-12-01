// apps/web/config/content.ts
import {ContentItem} from '@/lib/schemas';

// We exporteren dit als een TypeScript object in plaats van JSON
// Dit geeft ons autocomplete en type safety tijdens het bewerken
export const contentConfig = {
  pages: [
    {
      slug: 'grote-onderzoek-slachtoffers-strijd-om-rotterdam-mei-1940',
      type: 'article',
      path: 'content/articles/grote-onderzoek-slachtoffers-strijd-om-rotterdam-mei-1940.mdx',
      title: 'Het grote onderzoek',
      lastUpdated: '2025-04-28',
      summary:
        'Achter de schermen van het onderzoek naar de slachtoffers van de meidagen van 1940 in Rotterdam.',
      image: {
        src: '/images/articles/grote-onderzoek/rotterdam-mei-1940.jpg',
        alt: '',
      },
    },
    {
      slug: 'vermiste-kinderen-schuil',
      type: 'article',
      path: 'content/articles/vermiste-kinderen-schuil.mdx',
      title: 'De vermiste kinderen Schuil',
      lastUpdated: '2025-04-20',
      summary:
        'Hoe Josua, Cornelis en Pieternella Schuil pas een maand na het bombardement op Rotterdam werden teruggevonden.',
      image: {
        src: '/images/articles/vermiste-kinderen-schuil/eleonorastraat-1940.jpg',
        alt: '',
      },
    },
    {
      slug: 'korte-leven-van-hendrik-nieuwkamp',
      type: 'article',
      path: 'content/articles/korte-leven-van-hendrik-nieuwkamp.mdx',
      title: 'Het korte leven van Hendrik Nieuwkamp',
      lastUpdated: '2025-03-30',
      summary:
        'Hoe een aanstaande vader en gemobiliseerde soldaat uit Rotterdam omkwam op de eerste dag van de Duitse inval.',
      image: {
        src: '/images/articles/korte-leven-van-hendrik-nieuwkamp/hendrik-nieuwkamp-169.jpg',
        alt: '',
      },
    },
    {
      slug: 'drama-familie-lovisa',
      type: 'article',
      path: 'content/articles/drama-familie-lovisa.mdx',
      title: 'Het drama van de familie Lovisa',
      lastUpdated: '2025-01-29',
      summary:
        'Hoe een familiemaaltijd voor de Italiaanse terrazzowerkers Lovisa tijdens het bombardement op Rotterdam in 1940 fataal afliep.',
      image: {
        src: '/images/articles/drama-familie-lovisa/ageniesestraat-1930.jpg',
        alt: '',
      },
    },
    {
      slug: 'het-geluk-van-herman-bruins',
      type: 'article',
      path: 'content/articles/het-geluk-van-herman-bruins.mdx',
      title: 'Het geluk van Herman Bruins',
      lastUpdated: '2025-01-27',
      summary:
        'Het verhaal van Herman Bruins, die op 14 mei 1940 door het brandende Rotterdam fietste.',
      image: {
        src: '/images/articles/herman-bruins/kerkhoflaan-1930.jpg',
        alt: '',
      },
    },
    {
      slug: 'oorlog-van-mijn-oma',
      type: 'article',
      path: 'content/articles/oorlog-van-mijn-oma.mdx',
      title: 'De oorlog van mijn oma',
      lastUpdated: '2025-01-26',
      summary:
        "De persoonlijke herinneringen van Gijsberta van den Bos aan het 'Vergeten Bombardement' van 31 maart 1943 in Rotterdam.",
      image: {
        src: '/images/articles/oorlog-van-mijn-oma/twee-zusjes.jpg',
        alt: '',
      },
    },
    {
      slug: 'verhaal-van-roos-bekker',
      type: 'article',
      path: 'content/articles/verhaal-van-roos-bekker.mdx',
      title: 'Het verhaal van Roos Bekker',
      lastUpdated: '2025-01-24',
      summary:
        'Hoe Roos Bekker, samen met haar ouders, broers en zussen het bombardement op Rotterdam overleefde.',
      image: {
        src: '/images/articles/verhaal-van-roos-bekker/goudsesingel-vanuit-westen-1940.jpg',
        alt: '',
      },
    },
    {
      slug: 'lot-van-hendrika-hegmans-en-haar-dochters',
      type: 'article',
      path: 'content/articles/hendrika-hegmans-en-haar-dochters.mdx',
      title: 'Hendrika Hegmans en haar dochters',
      lastUpdated: '2025-01-23',
      summary:
        'Over het lot van Hendrika Hegmans en haar dochters, omgekomen bij het bombardement op Rotterdam in 1940.',
      image: {
        src: '/images/articles/hendrika-hegmans/hendrika-hegmans.jpg',
        alt: '',
      },
    },
    {
      slug: 'popke-de-jong-en-het-seinhuis',
      type: 'article',
      path: 'content/articles/popke-de-jong.mdx',
      title: 'Popke de Jong en het seinhuis',
      lastUpdated: '2025-01-23',
      summary:
        'Het verhaal van seinhuiswachter Popke de Jong die omkwam tijdens het bombardement van 31 maart 1943 op zijn post bij het Marconiplein.',
      image: {
        src: '/images/articles/popke-de-jong/emplacement-vierhavenstraat-1935.jpg',
        alt: '',
      },
    },
    {
      slug: 'bommen-van-berkels-patent',
      type: 'article',
      path: 'content/articles/bommen-van-berkels-patent.mdx',
      title: "Bommen op Van Berkel's Patent",
      lastUpdated: '2024-01-25',
      summary:
        "Het verhaal van het bombardement op 31 maart 1943 waarbij 28 medewerkers van Van Berkel's Patent om het leven kwamen.",
      image: {
        src: '/images/articles/van-berkels-patent/van-berkels-patent-1928.jpg',
        alt: '',
      },
    },
    {
      slug: 'de-zoektocht-naar-theresia-hoornstra',
      type: 'article',
      path: 'content/articles/de-zoektocht-naar-theresia-hoornstra.mdx',
      title: 'De zoektocht naar Theresia Hoornstra',
      lastUpdated: '2024-01-25',
      summary:
        'Het verhaal van de identificatie van één van de onbekende slachtoffers van het bombardement op Rotterdam in 1940.',
      image: {
        src: '/images/articles/zoektocht-theresia-hoornstra/oppert-rotterdam.jpg',
        alt: '',
      },
    },
    {
      slug: 'klein-meisje-in-grote-onderduik',
      type: 'article',
      path: 'content/articles/klein-meisje-onderduik.mdx',
      title: 'Een klein meisje in de grote onderduik',
      lastUpdated: '2024-01-25',
      summary:
        'Het verhaal van de Joodse familie Hirsch en hun onderduik tijdens de Tweede Wereldoorlog, verteld door moeder Mally.',
      image: {
        src: '/images/articles/klein-meisje-onderduik/ate-hecht-sprang-capelle.jpg',
        alt: '',
      },
    },
    {
      slug: 'school-groenteboer-en-dwaalspoor',
      type: 'article',
      path: 'content/articles/school-groenteboer-en-dwaalspoor.mdx',
      title: 'School, groenteboer en dwaalspoor',
      lastUpdated: '2024-01-25',
      summary:
        'Een reconstructie van het lot van de zussen Jacoba en Map Ouwendijk tijdens het bombardement op Rotterdam in 1940.',
      image: {
        src: '/images/articles/school-groenteboer-dwaalspoor/alemondestraat.jpg',
        alt: '',
      },
    },
    {
      slug: 'gezin-de-wolff-met-acht-slachtoffers',
      type: 'article',
      path: 'content/articles/gezin-de-wolff-met-acht-slachtoffers.mdx',
      title: 'Gezin de Wolff met acht slachtoffers',
      lastUpdated: '2024-01-23',
      summary:
        'Het tragische verhaal van het gezin de Wolff, waarvan acht leden omkwamen bij het bombardement op Rotterdam.',
      image: {
        src: '/images/articles/gezin-de-wolff/jacoba-eggink-en-wilhelmus-de-wolff.jpg',
        alt: '',
      },
    },
    {
      slug: 'jan-van-ettekoven',
      type: 'article',
      path: 'content/articles/jan-van-ettekoven.mdx',
      title: 'Diny is haar papa kwijt',
      lastUpdated: '2024-01-23',
      summary:
        'Het aangrijpende verhaal van Jan van Ettekoven, vermist na het bombardement van 31 maart 1943, en de eeuwige zoektocht van zijn dochter Diny.',
      image: {
        src: '/images/articles/jan-van-ettekoven/jan-van-ettekoven.jpg',
        alt: '',
      },
    },
    {
      slug: 'over-leven',
      type: 'article',
      path: 'content/articles/over-leven.mdx',
      title: 'Over Leven',
      lastUpdated: '2024-01-23',
      summary:
        'Het waargebeurde verhaal van de Duits-Joodse familie Hecht tijdens de Tweede Wereldoorlog.',
      image: {
        src: '/images/articles/overleven/overleven.jpg',
        alt: '',
      },
    },
    {
      slug: 'projectie-brandgrens-1940',
      type: 'article',
      path: 'content/articles/projectie-brandgrens-1940.mdx',
      title: 'Projectie Brandgrens Rotterdam 1940',
      lastUpdated: '2023-01-25',
      summary:
        'Overzicht van de verwoestingen na het bombardement op Rotterdam van 14 mei 1940.',
      image: {
        src: '/images/articles/projectie-brandgrens-1940/brandgrens.jpg',
        alt: '',
      },
    },
    {
      slug: 'zeedijk-haverstad-kamerling',
      type: 'article',
      path: 'content/articles/zeedijk-haverstad-kamerling.mdx',
      title: 'Zeedijk, Haverstad en Kamerling',
      lastUpdated: '2023-01-25',
      summary:
        'Een intrigerend verhaal over een complexe familierelatie op Goeree-Overflakkee in de 19e eeuw.',
      image: {
        src: '/images/articles/zeedijk-haverstad/goeree.jpg',
        alt: '',
      },
    },
    {
      slug: 'dezelfde-persoon',
      type: 'article',
      path: 'content/articles/dezelfde-persoon.mdx',
      title: 'Dezelfde persoon met verschillende namen',
      lastUpdated: '2022-01-25',
      summary:
        'Een bijzonder verhaal over hoe een vader tijdens militaire dienst een valse naam gebruikte bij de doop van zijn dochter.',
      image: {
        src: '/images/articles/dezelfde-persoon/akte-maartje-dekker.jpg',
        alt: '',
      },
    },
    {
      slug: 'burgerslachtoffers-bombardement-hoeksche-waard-14-mei-1940',
      type: 'other',
      path: 'content/research/burgerslachtoffers-bombardement-hoeksche-waard-14-mei-1940.mdx',
      title: 'Burgerslachtoffers bombardement Hoeksche Waard',
      lastUpdated: '2025-02-01',
      summary:
        'Overzicht van de burgerslachtoffers van het bombardement op de Hoeksche Waard op 14 mei 1940.',
    },
    {
      slug: 'burgerslachtoffers-bombardement-rotterdam-14-mei-1940',
      type: 'other',
      path: 'content/research/burgerslachtoffers-bombardement-rotterdam-14-mei-1940.mdx',
      title: 'Burgerslachtoffers bombardement Rotterdam 14 mei 1940',
      lastUpdated: '2025-02-01',
      summary:
        'Overzicht van de burgerslachtoffers van het bombardement op Rotterdam op 14 mei 1940.',
    },
    {
      slug: 'britse-militaire-slachtoffers-mei-1940',
      type: 'other',
      path: 'content/research/britse-militaire-slachtoffers-mei-1940.mdx',
      title: 'Britse militaire slachtoffers',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van de Britse militaire slachtoffers die omkwamen bij de Strijd om Rotterdam tussen 10 - 14 mei 1940.',
    },
    {
      slug: 'burgerslachtoffers-oorlogsgeweld-mei-1940',
      type: 'other',
      path: 'content/research/burgerslachtoffers-oorlogsgeweld-mei-1940.mdx',
      title: 'Burgerslachtoffers van het oorlogsgeweld',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van de burgerslachtoffers in Rotterdam e.o. tijdens de gevechten tussen 10 - 14 mei 1940.',
    },
    {
      slug: 'duitse-militaire-slachtoffers-mei-1940',
      type: 'other',
      path: 'content/research/duitse-militaire-slachtoffers-mei-1940.mdx',
      title: 'Duitse militaire slachtoffers',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van de Duitse militaire slachtoffers die omkwamen bij de Strijd om Rotterdam tussen 10 - 14 mei 1940.',
    },
    {
      slug: 'getroffen-objecten-en-terreinen-bombardement-31-maart-1943',
      type: 'other',
      path: 'content/research/getroffen-objecten-en-terreinen-bombardement-31-maart-1943.mdx',
      title: 'Getroffen objecten en terreinen Rotterdam 31 maart 1943',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van getroffen objecten en terreinen door het bombardement op Rotterdam-West op 31 maart 1943.',
    },
    {
      slug: 'getroffen-straten-bombardement-31-maart-1943',
      type: 'other',
      path: 'content/research/getroffen-straten-bombardement-31-maart-1943.mdx',
      title: 'Getroffen straten bombardement Rotterdam 31 maart 1943',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van de straten en adressen die getroffen zijn door het bombardement op Rotterdam-West op 31 maart 1943.',
    },
    {
      slug: 'nederlandse-militaire-en-burgerslachtoffers-waalhaven-mei-1940',
      type: 'other',
      path: 'content/research/nederlandse-militaire-en-burgerslachtoffers-waalhaven-mei-1940.mdx',
      title:
        'Nederlandse militaire en burgerslachtoffers bij vliegveld Waalhaven',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van Nederlandse militairen en burgers die sneuvelden tijdens de gevechten rondom vliegveld Waalhaven in mei 1940.',
    },
    {
      slug: 'britse-militaire-slachtoffers-waalhaven-mei-1940',
      type: 'other',
      path: 'content/research/britse-militaire-slachtoffers-waalhaven-mei-1940.mdx',
      title: 'Britse militaire slachtoffers bij vliegveld Waalhaven',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van britse militairen die sneuvelden tijdens de gevechten rondom vliegveld Waalhaven in mei 1940.',
    },
    {
      slug: 'nederlandse-militaire-slachtoffers-mei-1940',
      type: 'other',
      path: 'content/research/nederlandse-militaire-slachtoffers-mei-1940.mdx',
      title: 'Nederlandse militaire slachtoffers',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van de Nederlandse militaire slachtoffers die omkwamen bij de Strijd om Rotterdam tussen 10 - 14 mei 1940.',
    },
    {
      slug: 'overige-slachtoffers-rotterdam-mei-1940',
      type: 'other',
      path: 'content/research/overige-slachtoffers-rotterdam-mei-1940.mdx',
      title: 'Overige slachtoffers, Rotterdam e.o. mei 1940',
      lastUpdated: '2025-01-26',
      summary:
        'Documentatie van niet-geregistreerde slachtoffers en verloren ongeboren kinderen tijdens de bombardementen op Rotterdam in mei 1940.',
    },
    {
      slug: 'slachtoffers-bombardement-rotterdam-31-maart-1943',
      type: 'other',
      path: 'content/research/slachtoffers-bombardement-rotterdam-31-maart-1943.mdx',
      title: 'Slachtoffers bombardement Rotterdam 31 maart 1943',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van de 453 personen die omkwamen bij het bombardement op Rotterdam-West.',
    },
    {
      slug: 'slachtoffers-politie-mei-1940',
      type: 'other',
      path: 'content/research/slachtoffers-politie-mei-1940.mdx',
      title: 'Slachtoffers Politie',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van Rotterdamse politieagenten in actieve dienst die tussen 10 en 14 mei 1940 omkwamen tijdens de strijd om Rotterdam.',
    },
    {
      slug: 'strafgevangenis-noordsingel-slachtoffers-mei-1940',
      type: 'other',
      path: 'content/research/strafgevangenis-noordsingel-slachtoffers-mei-1940.mdx',
      title: 'Slachtoffers Strafgevangenis Noordsingel',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van de 42 slachtoffers die omkwamen bij het bombardement op de Strafgevangenis aan de Noordsingel op 14 mei 1940.',
    },
    {
      slug: 'slachtoffers-de-doelen-bombardement-rotterdam-14-mei-1940',
      type: 'other',
      path: 'content/research/slachtoffers-de-doelen-bombardement-rotterdam-14-mei-1940.mdx',
      title: 'Slachtoffers de Doelen',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van de 38 slachtoffers die omkwamen in en rond de Doelen bij het bombardement op Rotterdam van 14 mei 1940.',
    },
    {
      slug: 'slachtoffers-ceres-broodfabriek-bombardement-rotterdam-14-mei-1940',
      type: 'other',
      path: 'content/research/slachtoffers-ceres-broodfabriek-bombardement-rotterdam-14-mei-1940.mdx',
      title: 'Slachtoffers Ceres broodfabriek',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van de slachtoffers die omkwamen bij en in de Ceres broodfabriek bij het bombardement op Rotterdam van 14 mei 1940.',
    },
    {
      slug: 'vak-gg-bombardement-31-maart-1943',
      type: 'other',
      path: 'content/research/vak-gg-bombardement-31-maart-1943.mdx',
      title: 'Slachtoffers Vak GG – Bombardement 31 maart 1943',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van de slachtoffers van het bombardement op Rotterdam-West van 31 maart 1943, begraven in Vak GG op Begraafplaats Crooswijk.',
    },
    {
      slug: 'vak-gg-mei-1940',
      type: 'other',
      path: 'content/research/vak-gg-mei-1940.mdx',
      title: 'Slachtoffers Vak GG - mei 1940',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van de 556 slachtoffers die in Vak GG op Begraafplaats Crooswijk zijn begraven tussen 14 mei 1940 en eind september 1940.',
    },
    {
      slug: 'vak-p-mei-1940',
      type: 'other',
      path: 'content/research/vak-p-mei-1940.mdx',
      title: 'Militaire Slachtoffers Vak P - mei 1940',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van de 131 militairen die in Vak P op Begraafplaats Crooswijk zijn begraven na de gevechten in en rond Rotterdam in mei 1940.',
    },
    {
      slug: 'vermoedelijke-slachtoffers-bombardement-rotterdam-31-maart-1943',
      type: 'other',
      path: 'content/research/vermoedelijke-slachtoffers-bombardement-rotterdam-31-maart-1943.mdx',
      title: 'Vermoedelijke slachtoffers Rotterdam 31 maart 1943',
      lastUpdated: '2025-01-26',
      summary:
        'Overzicht van personen die vermoedelijk omkwamen bij het bombardement op Rotterdam-West op 31 maart 1943.',
    },
    {
      slug: 'vermoedelijke-slachtoffers-mei-1940-rotterdam',
      type: 'other',
      path: 'content/research/vermoedelijke-slachtoffers-mei-1940-rotterdam.mdx',
      title: 'Vermoedelijke slachtoffers Rotterdam mei 1940',
      lastUpdated: '2024-01-26',
      summary:
        'Overzicht van 102 personen die mogelijk slachtoffer zijn geworden van het oorlogsgeweld in Rotterdam tussen 10 - 14 mei 1940.',
    },
    {
      slug: 'namen-slachtoffers-10-14-mei-1940-rotterdam',
      type: 'research',
      path: 'content/research/namen-slachtoffers-10-14-mei-1940-rotterdam.mdx',
      title: 'Bombardement en strijd mei 1940',
      lastUpdated: '2025-02-01',
      summary:
        'Overzicht van de slachtoffers van het bombardement op Rotterdam en de gevechten tussen 10-14 mei 1940.',
      image: {
        src: '/images/front/rotterdam-bombardement-mei-1940.jpg',
        alt: '',
      },
    },
    {
      slug: 'namen-slachtoffers-bombardement-31-maart-1943-rotterdam',
      type: 'research',
      path: 'content/research/namen-slachtoffers-maart-1943-rotterdam.mdx',
      title: "Het 'Vergeten Bombardement' 1943",
      lastUpdated: '2025-01-17',
      summary:
        'Analyse van de slachtoffers en impact van het bombardement op Rotterdam-West op 31 maart 1943.',
      image: {
        src: '/images/front/rotterdam-vergeten-bombardement-31-maart-1943.jpg',
        alt: '',
      },
    },
    {
      slug: 'namen-slachtoffers-watersnoodramp-1953-goeree-overflakkee',
      type: 'research',
      path: 'content/research/namen-slachtoffers-watersnoodramp-1953-goeree-overflakkee.mdx',
      title: 'Watersnoodramp Goeree-Overflakkee',
      lastUpdated: '2024-12-12',
      summary:
        'Onderzoek naar de slachtoffers van de watersnoodramp van 1953 op Goeree-Overflakkee.',
      image: {
        src: '/images/research/slachtoffers-watersnoodramp-1953/watersnoodramp-1953.jpg',
        alt: '',
      },
    },
    {
      slug: 'namen-slachtoffers-surinam-airways-vlucht-py-764-7-juni-1989',
      type: 'research',
      path: 'content/research/namen-slachtoffers-surinam-airways-vlucht-py-764-7-juni-1989.mdx',
      title: 'Ramp Surinam Airways vlucht PY 764',
      lastUpdated: '2024-12-12',
      summary:
        'Onderzoek naar de slachtoffers van het ongeluk met Surinam Airways vlucht PY 764 op 7 juni 1989 bij Zanderij.',
      image: {
        src: '/images/research/surinam-airways-vlucht-py-764/surinam-airways-py-764-wrak.png',
        alt: 'Wrak van Surinam Airways vlucht PY 764 na de ramp bij Zanderij, 7 juni 1989',
      },
    },
    {
      slug: 'zoektocht-hans-van-wolde',
      type: 'research',
      path: 'content/research/zoektocht-hans-van-wolde.mdx',
      title: 'DNA zoektocht naar Hans van Wolde',
      lastUpdated: '2020-01-25',
      summary:
        'Een succesvol DNA-onderzoek naar de onbekende grootvader van Angelique via het programma Adres Onbekend.',
      image: {
        src: '/images/research/zoektocht-hans-van-wolde/hans-van-wolde.jpg',
        alt: '',
      },
    },
    {
      slug: 'gebruiksvoorwaarden',
      type: 'page',
      path: 'content/static/gebruiksvoorwaarden.mdx',
      title: 'Gebruiksvoorwaarden',
      lastUpdated: '2025-01-25',
      summary: 'De gebruiksvoorwaarden van de Stichting Voorouder website.',
    },
    {
      slug: 'historisch-en-verwantschapsonderzoek',
      type: 'page',
      path: 'content/services/historisch-en-verwantschapsonderzoek.mdx',
      title: 'Historisch en Verwantschapsonderzoek',
      lastUpdated: '2025-01-25',
      summary:
        'Ontdek de mogelijkheden van onderzoek samen met Stichting Voorouder',
    },
    {
      slug: 'privacyverklaring',
      type: 'page',
      path: 'content/static/privacyverklaring.mdx',
      title: 'Privacyverklaring',
      lastUpdated: '2025-01-25',
      summary: 'De privacyverklaring van de Stichting Voorouder website.',
    },
    {
      slug: 'bevolkingsreconstructies',
      type: 'service',
      path: 'content/services/bevolkingsreconstructies.mdx',
      title: 'Bevolkingsreconstructies',
      lastUpdated: '2025-01-25',
      summary: 'Reconstructie van historische bevolkingsgegevens.',
    },
    {
      slug: 'dna-verwantschapsonderzoek',
      type: 'service',
      path: 'content/services/dna-verwantschapsonderzoek.mdx',
      title: 'DNA Verwantschapsonderzoek',
      lastUpdated: '2025-01-25',
      summary:
        'Stichting Voorouder helpt bij het vinden van biologische verwanten.',
    },
    {
      slug: 'onderzoek-oorlogsgetroffenen',
      type: 'service',
      path: 'content/services/onderzoek-oorlogsgetroffenen.mdx',
      title: 'Onderzoek Oorlogsgetroffenen',
      lastUpdated: '2025-01-25',
      summary:
        'Reconstructie en documentatie van oorlogsgebeurtenissen en persoonlijke verhalen.',
    },
  ],
} as const satisfies {pages: ContentItem[]};
