# Raktárrendszer

Számos kis cég számára nem megoldott készleteik nyilvántartása. Sok esetben excelekben tárolják az adatokat, illetve körülményes, számukra túlbonyolított vállalatirányítási rendszerek nyilvántartó funkcióját használják. Felmerült az igény részükről egy felhasználóbarát és egyszerűen kezelhető alkamazás iránt, ahol pár kattintással hozzá tudnak adni új cikkeket a nyilvántartásukhoz, illetve a meglévő készleteket könnyen módosíthatják.

Az alkalmazáson belül megkülönböztetünk felhasználókat és adminokat. A felhasználókat az adminok adják hozzá a rendszerhez, emellett ők rendelkeznek jogosultsággal a törlés és szerkesztés műveletéhez egyaránt.

Az egyszerűbb használat érdekében bejelentkezés nélkül is lekérhetőek a készletek, amennyiben nem szeretnénk semmilyen módosítást végrehajtani, csak információszerzés a cél.

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

A felhasználó bejelentkezhet felhasználónév és jelszó megadásával.

## Cikkek - összes

A felhasználó jogosultságtól függetlenül táblázatos formában látja a cikkeket és kereshet a cikkek között. Amennyiben a felhasználó be van jelentkezve, a táblázat sorai végén szereplő `+`, illetve `-` jel segítségével tudja növelni, illetve csökkenteni a készletet.
Amennyiben a felhasználó rendelkezik admin jogosultsággal, a baloldali menü elérhetővé válik számára, hozzá tud adni új cikket (Cikk hozzáadása képernyő), módosítani tud meglévőt (Cikk módosítása képernyő), törölni tud, be tud importálni cikkeket .csv fájlból és ki tudja exportálni azokat.

## Cikk hozzáadása

Ha a felhasználó rendlekezik admin jogosultsággal, hozzáadhat új cikket a nyilvántartáshoz. Jóváhagyás után vissza navigál a Cikkek - összes képernyőre.

## Cikk módosítása

Ha a felhasználó rendlekezik admin jogosultsággal, módosíthatja már meglévő cikkek adatait. Jóváhagyás után vissza navigál a Cikkek - összes képernyőre.

## Felhasználók - összes

Csak admin felhasználók férnek hozzá. Táblázatos formában kilistázza a felhaználókat. A baloldali menü segítségével hozzá tud adni új felhasználót (Felhasználó hozzáadása képernyő), módosítani tud meglévőt (Felhasználó módosítása képernyő), illetve törlöni az adatbázisból.

## Felhasználó hozzáadása

Ha a felhasználó rendlekezik admin jogosultsággal, hozzáadhat új felhasználót az adatbázishoz. Jóváhagyás után vissza navigál a Felhasználók - összes képernyőre.

## Felhasználó módosítása

Ha a felhasználó rendlekezik admin jogosultsággal, módosíthatja már meglévő felhasználó adatait. Jóváhagyás után vissza navigál a Felhasználók - összes képernyőre.

## History

A felhasználó lát egy össesítést arról, hogy milyen készletváltozások voltak a múltban, milyen módosításokat hajtottak végre és az is láthatóvá válik számára, hogy ki hajtotta végre azokat. Dátum alapján tud szűrni a history elemek között.

<br>

## API végpontok

| Végpontok | Leírás |
| --------- | ----------- |
| POST /login | felhasználó bejelentkezés |
| POST /logout | felhasználó kijelentkezés |
| POST /users/add | felhasználó hozzáadása |
| GET /users/users-list | felhasználók lekérdezése |
| GET /users/:id | felhasználó lekérdezése ID alapján |
| PUT /users/:id | felhasználó szerkesztése ID alapján |
| DELETE /users/:id | felhasználó törlése ID alapján |
| POST /items/add | cikk hozzáadása |
| GET /items/items-list | cikkek lekérdezése |
| GET /items/:id | cikk lekérdezése ID alapján |
| PUT /items/:id | cikk szerkesztése ID alapján |
| DELETE /items/:id | cikk törlése ID alapján |
| POST /history/add | history hozzáadása |
| GET /history | history lekérdezése |




