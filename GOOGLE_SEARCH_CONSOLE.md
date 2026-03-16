# Google Search Console – pași

Site-ul are deja **sitemap** (`/sitemap.xml`) și **robots.txt** (`/robots.txt`). Următorii pași îi faci tu în browser (trebuie cont Google).

---

## 1. Adaugă proprietatea (site-ul) în Search Console

1. Mergi la: **https://search.google.com/search-console**
2. Autentifică-te cu contul Google cu care vrei să administrezi site-ul.
3. Click pe **„Adaugă proprietate”** / **„Add property”**.
4. Alege **„Prefix URL”** și introdu:
   - `https://www.rooflvl.ro`
5. Click **Continuare**.

---

## 2. Verificarea proprietății

Google îți va cere să dovedești că ești proprietarul. Variante frecvente:

### Varianta A – Verificare prin meta tag (recomandat)

1. Search Console îți dă un **cod** (meta tag), de forma:  
   `content="abcdef1234567890"`
2. Spune-mi acel cod și îl pot pune în `<head>` în `index.html`; după ce faci deploy, revii în Search Console și apeși **„Verifică”**.

### Varianta B – Verificare prin fișier HTML

1. Search Console îți dă un fișier (ex: `google123abc.html`).
2. Descarcă fișierul și pune-l în folderul **`public/`** al proiectului (în root, alături de `sitemap.xml`).
3. Fă deploy pe Vercel.
4. Verifică în browser că se deschide:  
   `https://www.rooflvl.ro/google123abc.html`
5. În Search Console apeși **„Verifică”**.

### Varianta C – Verificare prin DNS (la DataHost)

1. În Search Console alege **Verificare prin DNS**.
2. Îți dă o înregistrare **TXT** de adăugat la domeniu.
3. În cPanel la DataHost → Zone Editor → adaugi o înregistrare **TXT** cu valoarea dată de Google.
4. După ce salvezi (și aștepți câteva minute), în Search Console apeși **„Verifică”**.

---

## 3. Trimite sitemap-ul

După ce proprietatea e **Verificată**:

1. În meniul din stânga: **„Sitemaps”** / **„Hărți ale site-ului”**.
2. La **„Adaugă un sitemap nou”** scrie:  
   `sitemap.xml`  
   (sau URL complet: `https://www.rooflvl.ro/sitemap.xml`)
3. Click **„Trimite”** / **„Submit**”.

După câteva ore/zile, Google va lista paginile din sitemap și le va indexa.

---

## 4. (Opțional) Cere indexarea pentru pagina principală

1. Meniu stânga: **„Inspectare URL”** / **„URL Inspection”**.
2. Introdu: `https://www.rooflvl.ro/`
3. Click **„Solicită indexare”** / **„Request indexing”**.

Poți face la fel și pentru alte pagini importante (ex: `/produse`, `/contact`).

---

## Rezumat

| Ce ai făcut în proiect | Ce faci tu |
|------------------------|------------|
| Link Facebook actualizat în footer | – |
| `public/sitemap.xml` cu toate paginile | Adaugi proprietatea în Search Console, verifici, apoi trimiți sitemap-ul `sitemap.xml` |
| `public/robots.txt` cu Sitemap | – |

**Google Search Console nu se poate „face” din cod** – trebuie să te autentifici tu și să adaugi proprietatea + sitemap. După ce verifici (meta tag, fișier sau DNS), poți trimite sitemap-ul și eventual cere indexare pentru URL-uri importante.
