# Raktárrendszer

Számos kis cég számára nem megoldott készleteik nyilvántartása. Sok esetben excelekben tárolják az adatokat, illetve körülményes, számukra túlbonyolított vállalatirányítási rendszerek nyilvántartó funkcióját használják. Felmerült az igény részükről egy felhasználóbarát és egyszerűen kezelhető alkamazás iránt, ahol pár kattintással hozzá tudnak adni új cikkeket a nyilvántartásukhoz, illetve a meglévő készleteket könnyen módosíthatják.

Az alkalmazáson belül megkülönböztetünk felhasználókat és adminokat. A felhasználókat az adminok adják hozzá a rendszerhez, emellett ők rendelkeznek jogosultsággal a törlés és szerkesztés műveletéhez egyaránt.

Az egyszerűbb használat érdekében bejelentkezés nélkül is lekérhetőek a készletek, amennyiben nem szeretnénk semmilyen módosítást végrehajtani, csak információszerzés a cél.

<br>

# Link (Heroku deploy)

```
https://easy-storage-v2.herokuapp.com
```

<br>

# Alkalmazás futtatása

```
cd easyStorage-backend
```
```
npm run docker:build
```
```
npm run docker:run
```

<br>

# Swagger

```
http://localhost:3000/api-docs
```

<br>

# Tesztadatok belépéshez - felhasználó

```
Felhasználónév: user
```
```
Jelszó: user123!
```

<br>

# Tesztadatok belépéshez - admin

```
Felhasználónév: admin 
```

```
Jelszó: admin123!
```

<br>

# Technológiák

## Frontend

- HTML5
- CSS
- PrimNG
- Typescript
- Angular

## Backend

- Node.js
- Express
- MongoDB

<br>

# Entitások

## User

Az alkalmazáson belül megkülönböztetünk felhasználókat és adminokat. A felhasználók belépés után le tudják kérni a raktárkészletet, illetve tudják növelni és csökketeni a készletek számát. A felhasználókat az adminok adják hozzá a rendszerhez, rendelkeznek minden olyan jogousltásggal, mint a egyszerű felhasználók, emellett cikkek szerkesztéséhez és törléséhez is van hozzáférésük. Tároljuk a nevét, felhasználónevét, jelszavát, beosztását és jogosultságát.

## Item

Egy cikk hozzádásánál tároljuk a cikk nevét rajzszámát, darabszámot, raktárhelyét és amyennyiben rendelkezik vevői rajzszámmal, azt is.

## Storage

Tároljuk a raktár nevét, a polcot és opcionálisan a doboz számát.

## History

Minden egyes művelet során (kitárorás, betárolás, létrehozás, törlés stb) létrejön egy history elem, amelyben nyilvántartjuk, hogy ki, mikor és milyen módosítást hajtott végre a készleten.

<br>

# Képernyők/User story

## Login

A felhasználó bejelentkezhet felhasználónév és jelszó megadásával, illetve lehetőség van bejelentkezés nélkül is belépni, amennyiben csak keresni szeretne a készletben.

## Cikkek - összes

A felhasználó jogosultságtól függetlenül táblázatos formában látja a cikkeket és kereshet a cikkek között. Amennyiben a felhasználó be van jelentkezve, a táblázat sorai végén szereplő `+`, illetve `-` jel segítségével tudja növelni, illetve csökkenteni a készletet.
Amennyiben a felhasználó rendelkezik admin jogosultsággal, a baloldali menü elérhetővé válik számára, hozzá tud adni új cikket (Cikk hozzáadása képernyő), módosítani tud meglévőt (Cikk módosítása képernyő), törölni tud, ki tudja exportálni azokat .csv fájlba.

## Cikk hozzáadása

Ha a felhasználó rendlekezik admin jogosultsággal, hozzáadhat új cikket a nyilvántartáshoz. Jóváhagyás után vissza navigál a Cikkek - összes képernyőre.

## Cikk módosítása

Ha a felhasználó rendlekezik admin jogosultsággal, módosíthatja már meglévő cikkek adatait. Jóváhagyás után vissza navigál a Cikkek - összes képernyőre.

## Felhasználók - összes

Csak admin felhasználók férnek hozzá. Táblázatos formában kilistázza a felhaználókat. A baloldali menü segítségével hozzá tud adni új felhasználót (Felhasználó hozzáadása képernyő), módosítani tud meglévőt (Felhasználó módosítása képernyő), illetve törölni az adatbázisból.

## Felhasználó hozzáadása

Ha a felhasználó rendlekezik admin jogosultsággal, hozzáadhat új felhasználót az adatbázishoz. Jóváhagyás után vissza navigál a Felhasználók - összes képernyőre.

## Felhasználó módosítása

Ha a felhasználó rendlekezik admin jogosultsággal, módosíthatja már meglévő felhasználó adatait. Jóváhagyás után vissza navigál a Felhasználók - összes képernyőre.

## History

A felhasználó lát egy össesítést arról, hogy milyen készletváltozások voltak a múltban, milyen módosításokat hajtottak végre és az is láthatóvá válik számára, hogy ki hajtotta végre azokat. Dátum szerint csökkenő sorrendben vannak kilistázva az elemek és lehetősége van keresni az elemek között.

<br>

## API végpontok

| Végpontok | Leírás |
| --------- | ----------- |
| POST /api/login | felhasználó bejelentkezés |
| POST /api/logout | felhasználó kijelentkezés |
| POST /api/users/add | felhasználó hozzáadása |
| GET /api/users/users-list | felhasználók lekérdezése |
| GET /api/users/:id | felhasználó lekérdezése ID alapján |
| PUT /api/users/:id | felhasználó szerkesztése ID alapján |
| DELETE /api/users/:id | felhasználó törlése ID alapján |
| POST /api/items/add | cikk hozzáadása |
| GET /api/items/items-list | cikkek lekérdezése |
| GET /api/items/export | cikkek lekérdezése csv exporthoz |
| GET /api/items/:id | cikk lekérdezése ID alapján |
| PUT /api/items/:id | cikk szerkesztése ID alapján |
| DELETE /api/items/:id | cikk törlése ID alapján |
| POST /api/history/add | history hozzáadása |
| GET /api/history | adott számú history elem lekérdezése |
| GET /api/history/filtered | szűrt history elem/elemek lekérdezése |




