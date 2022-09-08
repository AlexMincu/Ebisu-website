/*
-- Garments
subcategory - type of garment
number_char - 
date_char 	- 
unique_char - gender (male, female, kids)
vector_char - materials

-- Footwear
subcategory - type of footwear
number_char - ?size
date_char - 
unique_char - gender
vector_char - materials

-- Masks
subcategory - type of masks
number_char - ?size
date_char -   
unique_char - gender
vector_char - materials

-- Sweets
subcategory - type
number_char - ?calories/100g
date_char - 
unique_char - producer
vector_char - ?ingredients

-- Books
subcategory - type (novel, manga, etc), cover-type
number_char - pages_no
date_char 	- published_date
unique_char - author
vector_char - genres

-- Figures
subcategory - 
number_char - figure height in mm
date_char 	- date-available
unique_char - producer
vector_char - 

-- Tapestries
subcategory - 
number_char -
date_char 	- 
unique_char - producer
vector_char - dimensions

*/

CREATE TABLE IF NOT EXISTS products (
	id 				SERIAL PRIMARY KEY,		--SERIAL = auto-increment
	name 			varchar(100)	NOT NULL, 
	description 	varchar(1000) 	NOT NULL, 
	img_path 		varchar(200) 	NOT NULL, 
	category 		varchar(100) 	NOT NULL,
	subcategory 	varchar(50)[] 	NOT NULL,
	price			real 			NOT NULL,
	number_char		int 			NOT NULL,
	date_char		date 			NOT NULL,
	unique_char		varchar(100) 	NOT NULL,
	vector_char		varchar(50)[] 	NOT NULL,
	in_stock		boolean 		NOT NULL
);

INSERT INTO products (
	name, 
	description, 
	img_path, 
	category, 
	subcategory, 
	price, 
	number_char, 
	date_char, 
	unique_char, 
	vector_char, 
	in_stock)
VALUES (

	-- Garments

	'Japanese kimono 6 items set', 
	'This item is from a kimono auction where only a limited number of professional kimono buyers can participate. It is a one of a kind. Traditional kimono is likened to "wearable art" since dozens of artisans techniques are used in one kimono. These traditional techniques and designs are breathtakingly beautiful and it is hard to find words to describe them.', 
	'/assets/images/products/products-page/garments/kimono.webp',
	'garments', 
	ARRAY ['Kimono', 'Houmongi'], 
	248.99, 
	0, 
	'2022.01.01', 
	'women', 
	ARRAY ['silk'], 
	true),

	(
	'Japanese kimono jacket', 
	'This item is from a kimono auction where only a limited number of professional kimono buyers can participate. It is a one of a kind. Traditional kimono is likened to "wearable art" since dozens of artisans techniques are used in one kimono. These traditional techniques and designs are breathtakingly beautiful and it is hard to find words to describe them.', 
	'/assets/images/products/products-page/garments/kimono-jacket.webp',
	'garments', 
	ARRAY ['Kimono', 'Haori'],
	149.99, 
	0, 
	'2022.01.01', 
	'women', 
	ARRAY ['silk'], 
	true),

	(
	'Long-sleeved kimono 6 items set', 
	'This item is from a kimono auction where only a limited number of professional kimono buyers can participate. It is a one of a kind. Traditional kimono is likened to "wearable art" since dozens of artisans techniques are used in one kimono. These traditional techniques and designs are breathtakingly beautiful and it is hard to find words to describe them.', 
	'/assets/images/products/products-page/garments/kimono-long-sleeve.webp',
	'garments', 
	ARRAY ['Kimono', 'Furisode'],
	229.99, 
	0, 
	'2022.01.01', 
	'women', 
	ARRAY ['silk'], 
	true),

	(
	'Braidal kimono', 
	'This item is from a kimono auction where only a limited number of professional kimono buyers can participate. It is a one of a kind. Traditional kimono is likened to "wearable art" since dozens of artisans techniques are used in one kimono. These traditional techniques and designs are breathtakingly beautiful and it is hard to find words to describe them.', 
	'/assets/images/products/products-page/garments/kimono-braidal.webp',
	'garments', 
	ARRAY ['Kimono', 'Uchikake'],
	899.99, 
	0, 
	'2022.01.01', 
	'women', 
	ARRAY ['silk'], 
	true),

	(
	'Men kimono', 
	'This item is from a kimono auction where only a limited number of professional kimono buyers can participate.A simple traditional kimono or "kinagashi" is suitable for everyday wear, casual events, festivals, cosplaying, and as a costume for Halloween or a play. Also you can also pair it with your favorite kimono jacket or hakama pants..', 
	'/assets/images/products/products-page/garments/kimono-m.webp',
	'garments', 
	ARRAY ['Kimono'],
	59.99, 
	0, 
	'2022.01.01', 
	'men', 
	ARRAY ['silk'], 
	true),

	(
	'Men yukata kimono', 
	'It is very lightweight, cool, and comfortable. You can wear it to a casual party, events in the spring and the summer or indoor events in all seasons.', 
	'/assets/images/products/products-page/garments/yukata-m.webp',
	'garments', 
	ARRAY ['Yukata'],
	69.99, 
	0, 
	'2022.01.01', 
	'men', 
	ARRAY ['cotton'], 
	true),

	(
	'Men Jinbei', 
	'Jinbei are lightweight Japanese kimono that are ideal for people who are wearing or buying a kimono for the first time.Jinbei are commonly worn in Japanese culture at spring and summer events like fireworks, Bon dance festivals, and other parties. Jinbei are very versatile and can be worn inside as loungewear and during all seasons.', 
	'/assets/images/products/products-page/garments/jinbei-m.webp',
	'garments', 
	ARRAY ['Jinbei'],
	49.99, 
	0, 
	'2022.01.01', 
	'men', 
	ARRAY ['cotton'], 
	true),

	(
	'Boy Jinbei Indigo/Plain', 
	'Jinbei are lightweight Japanese kimono that are ideal for people who are wearing or buying a kimono for the first time.Jinbei are commonly worn in Japanese culture at spring and summer events like fireworks, Bon dance festivals, and other parties. Jinbei are very versatile and can be worn inside as loungewear and during all seasons.', 
	'/assets/images/products/products-page/garments/jinbei-k.webp',
	'garments', 
	ARRAY ['Jinbei'],
	39.99, 
	0, 
	'2022.01.01', 
	'kids', 
	ARRAY ['cotton', 'hemp'], 
	true),

	(
	'Boy Jinbei Pattern C', 
	'Jinbei are lightweight Japanese kimono that are ideal for people who are wearing or buying a kimono for the first time.Jinbei are commonly worn in Japanese culture at spring and summer events like fireworks, Bon dance festivals, and other parties. Jinbei are very versatile and can be worn inside as loungewear and during all seasons.', 
	'/assets/images/products/products-page/garments/jinbei2-k.webp',
	'garments', 
	ARRAY ['Jinbei'],
	29.99, 
	0, 
	'2022.01.01', 
	'kids', 
	ARRAY ['cotton', 'hemp'], 
	true),

	-- Footwear

	(
	'Men Geta Sandals', 
	'Geta sandals are made from wood with rubber soles and the sandal thongs are made from remnants of kimono fabric. Sandals have a tighter fit compared to normal sandals.', 
	'/assets/images/products/products-page/footwear/sandals-geta1-m.webp',
	'footwear', 
	ARRAY ['Geta'],
	39.99, 
	0, 
	'2022.01.01', 
	'men', 
	ARRAY ['paulownia'], 
	true),

	(
	'Men Geta Sandals', 
	'Geta sandals are made from wood with rubber soles and the sandal thongs are made from remnants of kimono fabric. Sandals have a tighter fit compared to normal sandals.', 
	'/assets/images/products/products-page/footwear/sandals-geta2-m.webp',
	'footwear', 
	ARRAY ['Geta'],
	29.99, 
	0, 
	'2022.01.01', 
	'men', 
	ARRAY ['paulownia'], 
	true),

	(
	'Men Setta Sandals', 
	'We recommend setta sandals for kimono beginners because they are easy to walk in. and the sandal thongs are made from remnants of kimono fabric. Sandals have a tighter fit compared to normal sandals.', 
	'/assets/images/products/products-page/footwear/sandals-setta1-m.webp',
	'footwear', 
	ARRAY ['Setta'],
	36.99, 
	0, 
	'2022.01.01', 
	'men', 
	ARRAY ['cotton', 'vinyl'], 
	true),

	(
	'Men Setta Sandals', 
	'We recommend setta sandals for kimono beginners because they are easy to walk in. and the sandal thongs are made from remnants of kimono fabric. Sandals have a tighter fit compared to normal sandals.', 
	'/assets/images/products/products-page/footwear/sandals-setta2-m.webp',
	'footwear', 
	ARRAY ['Setta'],
	36.99, 
	0, 
	'2022.01.01', 
	'men', 
	ARRAY ['cotton', 'vinyl'], 
	true),

	(
	'Kids Geta Sandals', 
	'Geta sandals are made from wood with rubber soles and the sandal thongs are made from remnants of kimono fabric. Sandals have a tighter fit compared to normal sandals.', 
	'/assets/images/products/products-page/footwear/sandals-geta1-k.webp',
	'footwear', 
	ARRAY ['Geta'],
	19.99, 
	0, 
	'2022.01.01', 
	'men', 
	ARRAY ['paulownia'], 
	true),

	(
	'Kids Geta Sandals', 
	'Geta sandals are made from wood with rubber soles and the sandal thongs are made from remnants of kimono fabric. Sandals have a tighter fit compared to normal sandals.', 
	'/assets/images/products/products-page/footwear/sandals-geta2-k.webp',
	'footwear', 
	ARRAY ['Geta'],
	19.99, 
	0, 
	'2022.01.01', 
	'men', 
	ARRAY ['paulownia'], 
	true),

	-- Masks
	(
	'Kiku Japanese Chrysanthemum Print Face Mask', 
	'A handmade face mask in a Japanese linen-feel indigo cotton print with nose wire, filter slot and adjustable elastics.', 
	'/assets/images/products/products-page/masks/mask-kiku.webp',
	'masks', 
	ARRAY ['hygiene-purpose'],
	15.95, 
	0, 
	'2022.01.01', 
	'unisex', 
	ARRAY ['cotton', 'elastic'], 
	false),

	-- Sweets
	(
	'Pocky Sakura Matcha Chocolate', 
	'Something never changes, for a good reason. Pocky Chocolate is one of the original Pocky products. Debuted in October 1966, Pocky Chocolate has been Japanese people’s most favorite chocolate biscuits.', 
	'/assets/images/products/products-page/sweets/pocky-sakura-matcha.webp',
	'sweets', 
	ARRAY ['pocky', 'chocolate'],
	13.80, 
	0, 
	'2022.01.01', 
	'Glico', 
	ARRAY ['?', '?'], 
	true),

	(
	'Kit Kat Yogurt Cranberry & Almond Nuts', 
	'Kit Kat Yogurt Cranberry & Almond NutsAn exquisite balance of cranberry almond texture, chocolate sweetness and yogurt flavor! Crisp feeling is improved by five layers of wafers. It features a high-quality cranberry and almond taste that can be eaten by a single bite.', 
	'/assets/images/products/products-page/sweets/kit-kat-yogurt-cranberry.webp',
	'sweets', 
	ARRAY ['chocolate'],
	9.90, 
	0, 
	'2022.01.01', 
	'Nestle Japan', 
	ARRAY ['?', '?'], 
	true),

	(
	'Manju Japanese Sweets Assortment 18 pcs', 
	'Manju is a small rounded dough, made with a mixture of wheat, rice flour, and sugar, stuffed with adzuki paste and steamed.', 
	'/assets/images/products/products-page/sweets/manju-sweets.webp',
	'sweets', 
	ARRAY ['sweets'],
	19.45, 
	0, 
	'2022.01.01', 
	'Marukyo Japan', 
	ARRAY ['?', '?'], 
	true),

	(
	'Kit Kat Banana Caramel Easter Break', 
	'This bag contains individually wrapped mini bars. The banana powder was kneaded between the wafers and wrapped in banana-flavored chocolate. Enjoy the gentle Banana Caramel flavour.', 
	'/assets/images/products/products-page/sweets/kit-kat-banana.webp',
	'sweets', 
	ARRAY ['chocolate'],
	12.80, 
	0, 
	'2022.01.01', 
	'Nestle Japan', 
	ARRAY ['?', '?'], 
	true),

	-- Books
	(
	'Chainsaw Man, Vol. 11', 
	'Denji was a small-time devil hunter just trying to survive in a harsh world. After being killed on a job, he is revived by his pet devil Pochita and becomes something new and dangerous - Chainsaw Man.', 
	'/assets/images/products/products-page/books/chainsawman.webp',
	'books', 
	ARRAY ['manga', 'paperback'],
	9.99, 
	192, 
	'01.06.2022', 
	'Tatsuki Fujimoto', 
	ARRAY ['Action', 'Comedy Horror', 'Dark Fantasy'], 
	true),

	(
	'Jujutsu Kaisen, Vol. 16', 
	'To gain the power he needs to save his friend from a cursed spirit, Yuji Itadori swallows a piece of a demon, only to find himself caught in the midst of a horrific war of the supernatural.', 
	'/assets/images/products/products-page/books/jujutsukaisen.webp',
	'books', 
	ARRAY ['manga', 'paperback'],
	9.99, 
	192, 
	'01.06.2022', 
	'Geke Akutami', 
	ARRAY ['Adventure', 'Supernatural', 'Dark Fantasy'], 
	true),

	(
	'My Hero Academia, Vol. 31', 
	'Midoriya inherits the superpower of the world`s greatest hero, but greatness won`t come easy.', 
	'/assets/images/products/products-page/books/myheroacademia.webp',
	'books', 
	ARRAY ['manga', 'paperback'],
	9.99, 
	216, 
	'01.07.2022', 
	'Kohei Horikoshi', 
	ARRAY ['Adventure', 'Superhero', 'Science Fantasy'], 
	false),

	(
	'Attack on Titan, Vol. 3', 
	'The last thing Eren remembers before blacking out, a Titan had bitten off his arm and leg and was getting ready to eat him alive. Much to his surprise he wakes up without a scratch on him, with a crowd of angry soldiers screaming for his blood. What strange new power has he awakened, and what will happen when the boy devoted to destroying the Titans becomes one himself?.', 
	'/assets/images/products/products-page/books/attackontitan.webp',
	'books', 
	ARRAY ['manga', 'hardcover'],
	16.99, 
	208, 
	'01.12.2012', 
	'Hajime Isayama', 
	ARRAY ['Action', 'Dark Fantasy', 'Post-apocalyptic'], 
	true),

	(
	'Dr. Stone, Vol. 1', 
	'Imagine waking to a world where every last human has been mysteriously turned to stone...', 
	'/assets/images/products/products-page/books/drstone.webp',
	'books', 
	ARRAY ['manga', 'paperback'],
	9.99, 
	200, 
	'01.09.2014', 
	'Riichiro Inagaki', 
	ARRAY ['Adventure', 'Science Fiction', 'Post-apocalyptic'], 
	true),

	--Figures
	(
	'LookUp Sukuna', 
	'Figure of Sukuna from Jujutsu Kaisen', 
	'/assets/images/products/products-page/figures/sukuna.webp',
	'figures', 
	ARRAY ['?'],
	22.75, 
	110, 
	'12.06.2022', 
	'Megahouse', 
	ARRAY ['?', '?', '?'], 
	false),

	(
	'LookUp Kento Nanami', 
	'Figure of Kento Nanami from Jujutsu Kaisen', 
	'/assets/images/products/products-page/figures/kento-nanami.webp',
	'figures', 
	ARRAY ['?'],
	22.75, 
	110, 
	'12.06.2022', 
	'Megahouse', 
	ARRAY ['?', '?', '?'], 
	false),

	(
	'Nendoroid Kirby: 30th Anniversary Edition', 
	'From the "Kirby" series of games come a special limited edition Nendoroid of Kirby to celebrate the series 30th anniversary! The Nendoroid makes use of a number of magnets for posing, making his movements smooth, natural and easy to pose!', 
	'/assets/images/products/products-page/figures/kirby.webp',
	'figures', 
	ARRAY ['?'],
	31.97, 
	60, 
	'11.07.2022', 
	'Good Smile Company', 
	ARRAY ['?', '?', '?'], 
	false),

	(
	'Super Saiyan 4 Son Goku Figure', 
	'Figure of Goku from Dragon Ball', 
	'/assets/images/products/products-page/figures/goku-ss4.webp',
	'figures', 
	ARRAY ['?'],
	42.96, 
	150, 
	'10.05.2021', 
	'Bandai', 
	ARRAY ['?', '?', '?'], 
	true),

	(
	'Collection 3 Shy Guy', 
	'Figure of Shy Guy from Super Mario', 
	'/assets/images/products/products-page/figures/shy-guy-super-mario.webp',
	'figures', 
	ARRAY ['?'],
	5.54, 
	47, 
	'02.02.2020', 
	'Ishikawa Toy', 
	ARRAY ['?', '?', '?'], 
	true),

	(
	'Collection 3 Chomp', 
	'Figure of Chomp from Super Mario', 
	'/assets/images/products/products-page/figures/chomp-super-mario.webp',
	'figures', 
	ARRAY ['?'],
	5.54, 
	50, 
	'02.02.2020', 
	'Ishikawa Toy', 
	ARRAY ['?', '?', '?'], 
	true),

	--Tapestries
	(
	'The Great Wave of Kanagawa Tapestry', 
	'Tapestry wall hanging for living room bedroom dorm décor.', 
	'/assets/images/products/products-page/tapestries/great-wave-kanagawa.webp',
	'tapestries', 
	ARRAY ['Wall Art'],
	43.42, 
	0, 
	'01.01.1999', 
	'HangoverStudio', 
	ARRAY ['140', '115'], 
	true),

	(
	'Koi Fish Tapestry', 
	'Tapestry wall hanging for living room bedroom dorm décor.', 
	'/assets/images/products/products-page/tapestries/koy-fish.webp',
	'tapestries', 
	ARRAY ['Wall Art'],
	39.07, 
	0, 
	'01.01.1999', 
	'HangoverStudio', 
	ARRAY ['130', '130'], 
	true);