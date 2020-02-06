-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 19, 2020 at 12:38 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_deliv`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user` int(11) DEFAULT NULL,
  `restaurant` varchar(255) DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL,
  `bought` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user`, `restaurant`, `item`, `qty`, `price`, `total`, `bought`) VALUES
(4, 1, 'Rumah makan sini aja', 'Angel Cake', 1, NULL, '6000', 'false'),
(7, 2, 'Restoran Tanah Adek', 'Butter Braid', 1, NULL, '6000', 'true'),
(8, 2, 'Restoran Tanah Adek', 'Butter Braid', 2, NULL, '12000', 'true'),
(9, 2, 'Restoran Padang', 'Angel Delight', 4, NULL, '28000', 'true'),
(123, 3, 'Restoran Padang', 'Coppenrath & Wiese', 1, 6000, '6000', 'true'),
(124, 3, 'Restoran Padang', 'Coppenrath & Wiese', 1, 6000, '6000', 'true'),
(125, 3, 'Restoran Tanah Adek', 'Bird\'s Custard', 1, 7000, '7000', 'true'),
(126, 3, 'Restoran Tanah Adek', 'Bird\'s Custard', 1, 7000, '7000', 'true'),
(127, 3, 'Restoran Padang', 'Coppenrath & Wiese', 1, 6000, '6000', 'true'),
(128, 3, 'Restoran Padang', 'Coppenrath & Wiese', 1, 6000, '6000', 'true'),
(129, 3, 'Restoran Padang', 'Coppenrath & Wiese', 1, 6000, '6000', 'true'),
(131, 3, 'Restoran Padang', 'Coppenrath & Wiese', 1, 6000, '6000', 'true'),
(132, 3, 'Restoran Padang', 'Coppenrath & Wiese', 1, 6000, '6000', 'true'),
(134, 3, 'Restoran Padang', 'Coppenrath & Wiese', 4, 6000, '24000', 'true'),
(135, 3, 'Restoran Padang', 'Coppenrath & Wiese', 2, 6000, '12000', 'true'),
(136, 3, 'rumah makan sini aja', 'Entenmann\'s ', 1, 6000, '6000', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Desserts'),
(3, 'Cakes');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `restaurant` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `total_ratings` float NOT NULL DEFAULT 0,
  `images` varchar(255) DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `restaurant`, `name`, `category`, `created_by`, `price`, `description`, `total_ratings`, `images`, `date_created`, `date_updated`) VALUES
(1, 1, 'Angel Delight', 1, 1, 7000, 'Angel Delight is a powdered dessert product produced in the United Kingdom. It is designed to be mixed and whisked with milk to create a mousse-like sweet dessert', 2.3, 'null', '2019-12-23 13:29:10', '2019-12-23 13:37:47'),
(2, 2, 'Bird\'s Custard', 1, 1, 7000, 'Bird\'s Custard is the brand name for the original powdered, egg-free imitation custard powder, now owned by Premier Foods. Custard powder and instant custard powder are the generic product names for similar and competing products. The product is a cornflo', 4.5, 'null', '2019-12-23 13:42:14', '2019-12-23 13:42:14'),
(3, 2, 'Butter Braid', 1, 1, 6000, 'Butter Braid is a brand name for a type of yeasted pastry product manufactured by Country Maid, Inc.', 0, 'null', '2019-12-24 14:14:16', '2019-12-24 14:14:16'),
(4, 3, 'Cherrybrook Kitchen', 1, 1, 6000, 'Cherrybrook Kitchen is a privately held company producing baking products for the food allergy market.[1] The company was founded in 2004 by Patsy Rosenberg and is headquartered in Burlington, Massachusetts. The company was acquired by Cell-nique in 2011', 0, 'null', '2019-12-25 01:11:08', '2019-12-25 01:11:08'),
(5, 3, 'Chicoo', 1, 1, 6000, 'Chicoo syrup was first developed in Chico, California in 1935. Since then the brand has fallen into relative obscurity but can still be found at certain specialty stores around North America.', 0, 'null', '2019-12-25 01:11:54', '2019-12-25 01:11:54'),
(6, 2, 'Cool Whip', 1, 1, 6000, 'Cool Whip is a brand of imitation whipped cream, referred to as a whipped topping by its manufacturer, Kraft Heinz. It is used in North America as a topping for desserts, and in some no-bake pie recipes as a convenience food or ingredient that does not re', 0, 'null', '2019-12-25 01:12:18', '2019-12-25 01:12:18'),
(7, 1, 'Coppenrath & Wiese', 1, 1, 6000, 'Coppenrath & Wiese KG is a German food company that is one of the largest manufacturers of frozen bakery products in Europe. The company mainly produces frozen pies, cakes, tortes and tarts. The head office is in Osnabrück. In 2010, the company employed a', 5, 'null', '2019-12-25 01:12:52', '2019-12-25 01:12:52'),
(8, 2, 'Dr. Oetker', 1, 1, 6000, 'Dr. Oetker is a German multinational company that produces baking powder, cake mixes, frozen pizza, pudding, cake decoration, cornflakes, and various other products.', 0, 'null', '2019-12-25 01:13:13', '2019-12-25 01:13:13'),
(9, 3, 'Dream Whip', 1, 1, 6000, 'Dream Whip is a powder that is mixed with milk and vanilla to make a whipped dessert topping. Walter Baker & Company began producing the first version of this product in the United States in 1957. Dream Whip was developed in-house, at General Foods, Birds', 2, 'null', '2019-12-25 01:13:35', '2019-12-25 01:13:35'),
(10, 2, 'Eli\'s Cheesecake', 1, 1, 6000, 'Eli\'s Cheesecake is a cheesecake company based in Chicago. Eli\'s Original Plain Cheesecake, which has been called \"Chicago\'s most famous dessert\", is made of cream cheese, sour cream, eggs, sugar, and vanilla in a butter shortbread cookie crust. Since the', 0, 'null', '2019-12-25 01:14:03', '2019-12-25 01:14:03'),
(11, 3, 'Entenmann\'s ', 1, 1, 6000, 'Entenmann\'s is a company that manufactures baked goods and delivers them to supermarkets and other retailers for sale to the public. The company offers dessert cakes, donuts, cookies, cup cakes, loaf cakes, pies, cereal bars, muffins, Danish pastries, cru', 1, 'null', '2019-12-25 01:14:21', '2019-12-25 01:14:21'),
(12, 2, 'Jell-O', 1, 1, 6000, 'Jell-O is a registered trademark of Kraft Foods for varieties of gelatin desserts, puddings, and no-bake cream pies. The original Jell-O gelatin dessert is the signature of the brand.\n\n', 0, 'null', '2019-12-25 01:14:49', '2019-12-25 01:14:49'),
(13, 2, 'Jell-O 1-2-3 ', 1, 1, 6000, 'Jell-O 1-2-3 was a Jell-O gelatin product introduced in 1969 and discontinued in 1996. The product was one 4.3 ounce powdered mix that, when properly prepared, separated and solidified into three distinct layers: a creamy top, a mousse-like middle, and re', 0, 'null', '2019-12-25 01:15:06', '2019-12-25 01:15:06'),
(14, 2, 'Milky ', 1, 1, 6000, 'Milky is a dairy pudding produced in Israel by the Strauss corporation.\n\n', 0, 'null', '2019-12-25 01:15:19', '2019-12-25 01:15:19'),
(15, 1, 'Mrs. Wagner\'s', 1, 1, 6000, 'Mrs. Wagner\'s Pies were single-serving pies sold in waxed paper. They were made until July 11, 1969, by a company named Mrs. Wagner\'s Home Made Pies that was originally located in Ocean Grove, New Jersey, and later in Brooklyn, New York.\n\n', 0, 'null', '2019-12-25 01:15:37', '2019-12-25 01:15:37'),
(16, 1, 'My-T-Fine', 1, 1, 6000, 'My-T-Fine is a brand of pudding now marketed by Jel Sert.\n\n', 0, 'null', '2019-12-25 01:15:53', '2019-12-25 01:15:53'),
(19, 3, 'Allerheiligenstriezel ', 3, 1, 6000, 'Allerheiligenstriezel or simply Strietzel is a braided yeast pastry. Its name means \"All Saints\' braid\" in English and it consists of flour, eggs, yeast, shortening or butter, raisins, milk, salt, and decorating sugar or poppy seeds. Some regional variati', 0, '76905702_p0.png', '2019-12-25 01:17:56', '2019-12-25 01:17:56'),
(20, 3, 'Amandine ', 3, 1, 6000, 'Amandine is a Romanian chocolate layered cake filled with chocolate with caramel and fondant cream. Almond cream is sometimes used. As most Romanian cakes, they can be cut and served in 1-serving miniature cakes or as a big cake. They are among the most t', 0, 'null', '2019-12-25 01:18:13', '2019-12-25 01:18:13'),
(21, 3, 'Angel cake', 3, 1, 6000, 'Angel cake is a type of layered sponge cake dessert that originated in the United Kingdom, and first became popular in the late 19th century.\n\n', 0, 'null', '2019-12-25 01:18:30', '2019-12-25 01:18:30'),
(22, 3, 'Arany Galushka', 3, 1, 6000, 'Arany Galushka is a traditional Hungarian dessert consisting of balls of yeast dough (galuska). The balls are rolled in melted butter, and then rolled in a mixture of sugar and crushed nuts, assembled into layers and sprinkled with raisins, before being b', 0, 'null', '2019-12-25 01:19:01', '2019-12-25 01:19:01'),
(23, 3, 'Babka ', 3, 1, 6000, 'Babka is a sweet braided bread or cake of Ashkenazi Jewish origin popular in the United States, Serbia and Israel.\n\n', 0, 'null', '2019-12-25 01:20:38', '2019-12-25 01:20:38'),
(24, 3, 'Banbury ', 3, 1, 6000, 'A Banbury cake is a spiced, currant-filled, flat pastry cake similar to an Eccles cake, although it is more oval in shape. Once made and sold exclusively in Banbury, England, Banbury cakes have been made in the region to secret recipes since 1586 and are ', 0, 'null', '2019-12-25 01:20:54', '2019-12-25 01:20:54'),
(25, 3, 'Bánh ', 3, 1, 6000, 'In Vietnamese, the term bánh translates loosely as \"cake\" or \"bread\", referring to a wide variety of prepared foods. With the addition of qualifying adjectives, bánh refers to a wide variety of sweet or savoury, distinct cakes, buns, pastries, sandwiches,', 0, 'null', '2019-12-25 01:21:11', '2019-12-25 01:21:11'),
(26, 3, 'Bika ambon', 3, 1, 6000, 'Bika ambon is a dessert from Indonesia. Made from ingredients such as tapioca flour, eggs, sugar, yeast and coconut milk, Bika Ambon is generally sold in pandan flavour, but it is also available in other flavors like banana, durian, cheese, chocolate.\n\n', 0, 'null', '2019-12-25 01:21:44', '2019-12-25 01:21:44'),
(27, 3, 'Black bun', 3, 1, 6000, 'Black bun, sometimes known as Scotch bun, is a type of fruit cake completely covered with pastry. It is Scottish in origin, originally eaten on Twelfth Night but now enjoyed at Hogmanay. The cake mixture typically contains raisins, currants, almonds, citr', 0, 'null', '2019-12-25 01:21:59', '2019-12-25 01:21:59'),
(28, 1, 'Black Forest', 3, 1, 6000, 'Black Forest gâteau or Black Forest cake is a chocolate sponge cake with a rich cherry filling based on the German dessert Schwarzwälder Kirschtorte, literally \"Black Forest Cherry-torte\".\n\n', 0, 'null', '2019-12-25 01:22:20', '2019-12-25 01:22:20'),
(29, 1, 'Buck wheat gateau', 3, 1, 6000, 'Buckwheat gateau or Buckwheat torte is a dessert that is a speciality of the Lüneburg Heath region of Lower Saxony in northern Germany.\n\n', 0, 'null', '2019-12-25 01:22:48', '2019-12-25 01:22:48'),
(30, 1, 'Bolo-rei', 3, 1, 6000, 'Bolo-rei, is a traditional Portuguese cake that is usually eaten around Christmas, from December 25 until Epiphany, on 6 January. It is a staple holiday dessert in any Portuguese home.\n\n', 0, 'null', '2019-12-25 01:23:00', '2019-12-25 01:23:00'),
(32, 2, 'Baumkuchen ', 3, 1, 8000, 'Baumkuchen is a German variety of spit cake. It is a traditional pastry of many European countries, and also a popular snack and dessert in Japan. The characteristic rings, which resemble tree rings when sliced, give the cake its German name, Baumkuchen, ', 0, '1', '2019-12-25 10:01:48', '2019-12-25 10:01:48'),
(36, 1, 'coca cola', 1, 1, 3000, '1', 0, NULL, '2019-12-30 05:45:58', '2019-12-30 05:45:58'),
(37, 3, 'asd', 3, 2, 50000, 'asd', 5, 'asd', '2020-01-03 12:12:54', '2020-01-03 12:12:54');

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `user`, `logo`, `location`, `description`) VALUES
(1, 'Restoran Padang', 1, '77514095_p0.jpg', '(-2.147324, 101.291202)', 'ga kemana2'),
(2, 'Restoran Tanah Adek', 1, 'null', '(-0.928905, 100.367287)', 'ke sono aja'),
(3, 'rumah makan sini aja', 1, '76905702_p0.png', '1999', 'rumah makan yg ga kemana2');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `review` varchar(255) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `item` int(11) DEFAULT NULL,
  `ratings` float DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `review`, `user`, `item`, `ratings`, `created_on`, `updated_on`) VALUES
(1, 'Makanan ini enak namun terlalu berkalori.', 1, 1, 5, '2019-12-26 04:09:16', '2019-12-27 07:11:31'),
(2, '1', 1, 2, 5, '2019-12-26 04:09:16', '2019-12-27 08:08:38'),
(3, 'ga enak sama sekali.', 1, 2, 2, '2019-12-26 04:09:16', '2019-12-27 07:11:31'),
(4, 'Biasa saja.', 1, 1, 4, '2019-12-26 04:09:16', '2019-12-27 07:11:31'),
(5, 'makanan basi', 1, 1, 1, '2019-12-26 04:09:16', '2019-12-27 07:11:31'),
(6, 'makanan kotor', 1, 1, 1, '2019-12-26 04:09:16', '2019-12-27 07:11:31'),
(16, '1', 1, 1, 1, '2019-12-27 07:03:36', '2019-12-27 07:11:31'),
(17, '1', 1, 1, 1, '2019-12-27 07:04:28', '2019-12-27 07:11:31'),
(18, '1', 1, 1, 1, '2019-12-27 07:05:07', '2019-12-27 07:11:31'),
(19, '1', 1, 1, 5, '2019-12-27 07:07:17', '2019-12-27 08:09:27'),
(21, 'enak sih', 2, 9, 2, '2020-01-05 17:44:16', '2020-01-05 18:21:10'),
(22, 'Makanan nya basi', 5, 11, 1, '2020-01-06 03:27:07', '2020-01-06 03:45:57'),
(23, 'asd', 3, 1, 2, '2020-01-12 09:31:52', '2020-01-12 09:31:52'),
(24, 'asd', 3, 1, 2, '2020-01-12 10:04:38', '2020-01-12 10:04:38'),
(27, 'asdasd', 3, 2, 5, '2020-01-12 10:45:55', '2020-01-12 10:45:55'),
(28, 'asdasd', 3, 2, 5, '2020-01-12 10:46:13', '2020-01-12 10:46:13'),
(29, 'mantep kali', 3, 2, 5, '2020-01-12 10:47:53', '2020-01-12 10:47:53'),
(30, 'kue nya enak', 3, 2, 5, '2020-01-13 06:14:34', '2020-01-13 06:14:34');

-- --------------------------------------------------------

--
-- Table structure for table `revoked_tokens`
--

CREATE TABLE `revoked_tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `signed_out` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `revoked_tokens`
--

INSERT INTO `revoked_tokens` (`id`, `token`, `signed_out`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODI0MDY1Mn0.ybzX2oOyGDuAYihJwTsHd1G12oD9pkU1Wr9nvV5hKRs', 'true'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJpaHNhbmtsIiwicm9sZXMiOjEsImV4cGlyZXNJbiI6IjFoIiwiaWF0IjoxNTc4MjQ0OTg3fQ.IS1sGQ2iMXQJJJ8BXXgU3AF_yCjo26itsRsCpe979dA', 'true'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJhcmthZGVteSIsInJvbGVzIjozLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODI4MTE1Nn0.Ctr37nW4F4N6zn64fxVwiiZH8OecRVvs2y6hLBBBhsU', 'true'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJhcmthZGVteSIsInJvbGVzIjozLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODI4MTM0OH0.bjPtibTZmOqD8NSqltAovPB6Di60nZ_tDoSfz6Qjx_c', 'false'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODYwODg0OH0.isHQfmgQFu63pIuvHtIVwQvJmJVkz9vb2smW_LKrbbs', 'false'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODcxNzU2MH0.7W7Uwkt2L9X0w1PNVvurmKKF43PqBtHtFXmj6VYR1_Q', 'false'),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODcxODM0N30.yBL23DiqU85Cw9YS7kucIAbg09MKoOn7UY02Ktrd0Zc', 'false'),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODcxODYwMX0.yAkgD30AbEe5IqoIPkXUbNQ36QS5tNadDa7OD4KFtnw', 'false'),
(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODcxODk0Nn0._7BlNHGKOyux8mPL4ONGdhidTVo2GeUyZ-sLKaf42KA', 'false'),
(10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODcxODk3Mn0.HKVZkOZo0sRcsoWyrnFGWoJ6udWCcaD6YhQZhBElp6I', 'false'),
(11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODcxOTA4N30.IPlL6NqAjWirHB8ytEC-_0eH2q38IKu0i5KdJ4fNuIM', 'false'),
(12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODcyMTMxMn0.5EJ3qh0uwdFE4Dum7qpVUR1U3ikO9BC5eR_2MqsnNdw', 'false'),
(13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODcyMTk5MH0.Jnam7Wux91ZoDb-MHT9qWR-Nw21H28RFNP1hNuTeqTk', 'true'),
(14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODcyMjE2MX0.5ICO604rmJzEpU3wqO2mRfBwvSaXKbFhAg8whaE3DjU', 'true'),
(15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODcyMjk4Nn0.B-3R-oC2HtOvZxRG6OeF16VhAX1EFATpqmBf7r9tZOY', 'true'),
(16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODcyNTI0NX0.-QB40u67Wp6tu2fkZ4Y3_9gQM0yBlVBklYtcmIDde-0', 'true'),
(17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODcyNTI5NX0.2sIGV-nSV7wjKjcwZDRSUjXQxEDTAxCyfcXHehQMjSs', 'true'),
(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODcyNTczM30.GehGF7K5KIt7LmcFWs4lwxokdkTn023dWwmJn1SsV6w', 'true'),
(19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODcyNjAyNX0.xJD_tIDC5o1O4xAiPWOYmYMfpzFPtGLWB7SwaQeZJbI', 'true'),
(20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODczNTU1MX0.ph4y35giBq8Gyxct83NplaUEsRUmCJTxRZncLkKM8qY', 'true'),
(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODc1MDkyN30.B65jlCaee36IkInmTkhL_PO_D-hlaH1aVNcTm4f6l7M', 'false'),
(22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODgwMjQzMX0.8HlpFytL7e9ssQuh_casMk9DwNtoWWYnJYNtQ9_KfDM', 'false'),
(23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODg0NzQ1OH0.qL1QO1Q1A6GX2vtB5anHTkpXIBXN4vGNc47PjfdtAkA', 'true'),
(24, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODg5NTk3Nn0.D6ExuecpzK8cIRvZNbR8T0Ra36ecuX4lUO9FCUtbtjU', 'true'),
(25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzb21ldXNlciIsInJvbGVzIjoyLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU3ODg5NjEzNn0.Lbehw5jTlIOyLE-yg27Ohu_PBvAtNXec_9Y6PLpyU0A', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `level` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `level`) VALUES
(1, 'admin'),
(2, 'restaurant'),
(3, 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roles` int(11) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `roles`, `created_on`, `updated_on`) VALUES
(1, 'Ihsanklkkk', 'cobatebak?', 3, '2019-12-24 08:53:56', '2019-12-24 08:53:56'),
(2, 'ihsankl', '$2a$10$f/eKSjvuxaleZ35Kec9ObeUQch29Yq7x0nTD7LWtGjPphDE58M3J6', 1, '2019-12-24 08:57:35', '2019-12-24 09:03:32'),
(3, 'someuser', '$2a$10$2G0Ry4lOJfPHXDVgsdOScOh29Gj0ywv/Nwe12kdiBXcTL1vM.ia1e', 2, '2019-12-30 03:25:00', '2019-12-30 03:25:00'),
(4, 'asdasd', '$2a$10$zi7tfJ6caMlqOyl9HMrlw.OcZpz.jW1c12oRjs19S1EUVqKgBRsLq', 3, '2020-01-06 02:41:48', '2020-01-06 02:41:48'),
(5, 'arkademy', '$2a$10$yEiuk1wj8A2NVOFcHoE73uHrObHgKvh0ykwXcjd6UJIcqW1ZZYvym', 3, '2020-01-06 03:25:36', '2020-01-06 03:25:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_tes` (`user`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_03` (`category`),
  ADD KEY `FK_04` (`created_by`),
  ADD KEY `FK_564` (`restaurant`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_06` (`user`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_998` (`user`),
  ADD KEY `FK_009` (`item`);

--
-- Indexes for table `revoked_tokens`
--
ALTER TABLE `revoked_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_07` (`roles`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `revoked_tokens`
--
ALTER TABLE `revoked_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `FK_tes` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `FK_03` FOREIGN KEY (`category`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_04` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_564` FOREIGN KEY (`restaurant`) REFERENCES `restaurants` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD CONSTRAINT `FK_06` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `FK_009` FOREIGN KEY (`item`) REFERENCES `items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_998` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_07` FOREIGN KEY (`roles`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
