# *Intellecta* – Veb platforma za kurseve 

*Intellecta* veb aplikacija omogućava postavljanje i slušanje različitih kurseva iz različitih oblasti. Za svaki kurs se postavljaju materijali na osnovu kojih korisnici uče, a koji su sistematski podijeljeni na period od nekoliko sedmica. Korisnici imaju mogućnost da prate svoj napredak, označavaju završene kurseve ili dijelove kurseva i ocjenjuju kurseve koje pohađaju uz pisanje recenzija.

## Opis aplikacije

Aplikacija *Intellecta* je višekorisnička aplikacija sa dva tipa korisnika: korisnik i administrator. Korisnik unosi lične podatke prilikom registracije, a zatim se na osnovu svoje e-mail adrese i lozinke prijavljuje na platformu. U sistemu može postojati samo jedan korisnik sa datom e-mail adresom. Ukoliko korisnik izabere opciju da se prijavi kao administratorski tip korisnika, neohodno je da sačeka odobrenje jednog od već postojećih administratora (osim ako nijedan administrator nije registrovan u bazi, tada se prvi prijavljeni admin odobrava automatski). Registrovanje običnog korisnika ne zahtijeva dodatno odobrenje. Svi tipovi korisnika imaju mogućnost da dodaju kurseve, što uključuje osnovne podatke o kursu, kategoriju (jednu od ponuđenih kategorija) i materijale za odgovarajući kurs. Materijali mogu biti tekstualnog tipa (.pdf, .txt, .docx) i video fajlovi (.mp4). 
Svaki registrovani korisnik ima opciju pregleda svih kurseva dostupnih na aplikaciji, kurseva koje je on kreirao i kurseva koje sluša. Prilikom upisa na kurs, korisnik ima pregled materijala po sedmicama (na način na koji je to organizovao kreator kursa), uz opciju označavanja završenog materijala i praćenja postotka završenog dijela kursa. 
Korisnik će pri svakom upisu na kurs, svakom odobrenom kreiranom kursu i pri kompletiranju svakog kursa dobijati e-mail o konkretnom događaju. Takođe, svi korisnici kursa će dobijati automatski e-mail jednom sedmično, koji će ih podsjećati na kurseve koje slušaju. 

## Korišteni jezici i biblioteke 

Potrebno je imati *Windows 10* kao operativni sistem.

Koristi se *HTML*, *CSS* i *JavaScript* za frontend.

Backend je napravljen u *.NET 7*.

Koristi se *Hangfire* biblioteka za automatsko slanje mejlova.

*Entity Framework* se koristi za pristup bazi podataka.

*AutoMapper* biblioteka se koristi za mapiranje objekata.

*JWT Bearer* se koristi za autentikaciju i autorizaciju korisnika.

*OpenAPI* se koristi za dokumentovanje i testiranje API-ja.

*MailKit* se koristi za slanje i prijem email poruka.

## Pokretanje aplikacije

Nakon otvaranja aplikacije u Visual Studio Code-u, potrebno je u terminal ukucati komandu *dotnet watch run*. Prethodno je potrebno importovati sql bazu (fajl *skripta.sql*) u SQL Server Management Studio. Ukoliko je to neophodno, potrebno je promijeniti konekcioni string tako da on odgovara instanci SQL Servera koju imate instaliranu na vašem računaru.

## Autori
Ivana Jugović – *ivana.jugovic.2121@student.etf.ues.rs.ba* / *jugovicivana12@gmail.com* 

Lena Šaraba – *lena.saraba.2094@student.etf.ues.rs.ba* / *lenasaraba8@gmail.com* 
