This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Instruktioner av projektarbete i javascript som backend språk

## Inloggning:

`app/components/Auth.jsx: `
Använder mig av useRouter och useAuth. UseRouter tillåter mig att redirecta i app. useAuth tar med autentisering via auth.js

useState kollar om isRegistered är true eller false
Om isLoggedIn är true redirectas anvädaren till home page
Om isLoggedIn redan är inloggad returneras null som ser till att inga andra komponenter renderas.

`app/context/auth.js:`
AuthProvider
user: Data om den inloggade
token: Sparar autentiseringsnyckel
isLoggedIn: håller koll om användaren är inloggad eller ej

/Actions/
login:
Innehåller en useEffect som kollar,

1. Om det finns en lagrad key
2. Om token finns loggas user in
3. \_getUser kallar på api `/localhost:3000/api/auth/me` för att hämta användarens token och => setIsloggedIn(true) om lyckat

register: Funger ungefär som login men skickar istället med en body

logout: återstället user, token och sätter isLoggedIn till (false)

Tack vare AuthContext.Provider som wrappar appen och kan i sin tur dela med sig av datan till allt som ligger innanför.
komponenterna, dess {children} har nu tillgång till user, token och isLoggedIn (action: login, register, logout)

useAuth() kan nu användas överallt och autentisering finns där med tillgängligt.

## Skapandet av ett item

`api/items/route,js`

1. REQUEST: API:et får en post request att skapa ett nytt item.
2. CREATE: Prisma integrerar med databasen och med den medskickade datan som följer Prisma/schemat.
3. RESPONSE: Returner Json.response med ett nyskapat item med unikt id

För att redigera eller tabort item använder jag params {id} = params. Det tar ut id specifikt genom api:t ungefär så här `/items/123`
Jag letar efter id och skickar med en ny body eller delete

## useItem Hook

i [List.jsx] importerar vi hooken.

<Form onItemChange = {fetchItems}>
<Item onItemChange = {fetchItems}>

const fetchItems = async () => {
const response = await fetch(api/items)
const data = await respons.json()
setItems(data) "Sätter items state med data"
}
useEffect(() => {
fetchItems() "Kallar function med komponent"
}, [])
return {items, fetchItems}

returnerar Items och funktionen till komponenter som använder den

## Filtrering kategori och inStock

1. FilterBar.jsx tar in items som props, en full lista med items.
2. En callback funktion skickar den filtrerade listan till sin parent komponent List.jsx (handleFilterChange)

_Koncept_
const [selectedCategory, setSelectedCategory] = useState("")
const [inStock, setIsInStock] = useState(false)

1. selectedCategory: Håller värdet av vald kategori
2. isInStock: Håller värdet om checkboxen är checked

useEffect - Körs när [items,selectedCategory,inStock] ändras. "Dependancy"

1. categoryMatch - filtrerar kategori och om ingen category finns returnerar true för att visa alla items.
2. stockMatch - om checkbox = checked visas bara items som är item.inStock === true.

_Eventhandlers_
onCategoryChange - uppdaterar state när dropdown ändras (select)
onInStockChange - uppdaterar inStock state med checked checkbox

_Övrigt_
uniqueCategories skapar en ny array med options utan dubbletter.

## Komponenter LIST.JSX

[List.jsx], children -> [Form.jsx], [FilterBar.jsx], [Item.jsx].

_Koncept_
const [filteredItems, setFilteredItems] = useState([])

1. filteredItems: håller items efter filtrering och uppdateras av handleFilterChange()
2. const {items, fetchItems}, hämtar items från api
3. handleFilterChange = (filterList) => {
   setFilteredItems(filterItems)
   }
   Den här funktionen får en lista från sitt child [FilterBar.jsx]
   Den uppdaterar "filteredItems" state.
   [FilterBar.jsx] skickar den filtrerade listan genom onFilterChange {prop}.

_Rendering av items_
Komponenten renderar antingen (?) filteredItems eller (:) hela listan om inga filter är angivna.
Sedan loopas filteredItems eller items igenom och skickar varje item som en prop till [Item.jsx] komponenten

## Komponentflöde:

[Form.jsx]: Tar hand om att lägga till nya `items`
[FilterBar.jsx]: Tillåter användaren att välja och filtrera på kategorier och om varan finns `inStock`
[List.jsx]: När användaren filtrerar på FilterBar skickas den filtrerade listan till [List.jsx] genom handleFilterChange

[List.jsx] renderar items baserade på filter

## Sammanfattning:

[FilterBar.jsx]: Filtrerar items baserat på kategori och inStock. Använder useEffect för att kalla på onFilterChange med filtrerad lista varje gång den ändras. _I dependancy_ [items,selectCategory,isInStock]

[List.jsx]: Visar Items. Använder filtrerad list från [FilterBar.jsx] om det finns annars visas allt.
