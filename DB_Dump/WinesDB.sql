-- phpMyAdmin SQL Dump
-- version 5.0.4deb2~bpo10+1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 07, 2023 at 03:41 AM
-- Server version: 10.3.31-MariaDB-0+deb10u1
-- PHP Version: 7.3.31-1~deb10u3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u20743956_Wines`
--

-- --------------------------------------------------------

--
-- Table structure for table `Location`
--

CREATE TABLE `Location` (
  `Postal_Code` int(16) NOT NULL,
  `Country` varchar(32) NOT NULL,
  `Region` varchar(64) DEFAULT NULL,
  `Street_Name` varchar(32) DEFAULT NULL,
  `Street_Number` int(16) DEFAULT NULL,
  `Location_ID` int(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Location`
--

INSERT INTO `Location` (`Postal_Code`, `Country`, `Region`, `Street_Name`, `Street_Number`, `Location_ID`) VALUES
(7600, 'South Africa', 'Stellenbosch', 'Main Street', 123, 1),
(33000, 'France', 'Bordeaux', 'Rue de la Vigne', 456, 2),
(50123, 'Italy', 'Tuscany', 'Via del Vino', 789, 3),
(26006, 'Spain', 'Rioja', 'Calle de la Bodega', 987, 4),
(54292, 'Germany', 'Mosel', 'Weinstraße', 654, 5),
(7690, 'South Africa', 'Franschhoek', 'Vineyard Road', 321, 6),
(5352, 'Australia', 'Barossa Valley', 'Wine Street', 654, 7),
(94558, 'United States', 'Napa Valley', 'Vineyard Lane', 789, 8),
(5050, 'Portugal', 'Douro Valley', 'Rua do Vinho', 987, 9),
(5500, 'Argentina', 'Mendoza', 'Calle del Vino', 123, 10),
(7806, 'South Africa', 'Constantia', 'Grapevine Avenue', 456, 11),
(51100, 'France', 'Champagne', 'Avenue des Vignes', 789, 12),
(14100, 'Italy', 'Piedmont', 'Strada del Vino', 987, 13),
(43730, 'Spain', 'Priorat', 'Carrer del Celler', 654, 14),
(65343, 'Germany', 'Rheingau', 'Weinbergstraße', 321, 15),
(7646, 'South Africa', 'Paarl', 'Winery Street', 654, 16),
(6285, 'Australia', 'Margaret River', 'Vineyard Drive', 789, 17),
(95476, 'United States', 'Sonoma Valley', 'Wine Country Road', 987, 18),
(7000, 'Portugal', 'Alentejo', 'Estrada do Vinho', 123, 19),
(4400, 'Argentina', 'Salta', 'Avenida del Vino', 456, 20),
(7200, 'South Africa', 'Hemel-en-Aarde Valley', 'Cellar Lane', 789, 21),
(84100, 'France', 'Côtes du Rhône', 'Chemin des Vignes', 987, 22),
(8720, 'Spain', 'Penedès', 'Carrer de la Bodega', 321, 24),
(79098, 'Germany', 'Baden', 'Weinbergweg', 654, 25),
(1231, 'France', 'Champagne', 'Sparkle street', 212, 26),
(90, 'Franse', 'Champagne', 'Sui Ave', 2, 27),
(121, 'Italy', 'Provincia di Pavia', 'Spaget', 33, 28),
(154, 'South Africa', 'Constantia', 'Grondpad', 1, 29),
(98, 'Hungary', 'Tokaj', 'Starte Road', 1, 30);

-- --------------------------------------------------------

--
-- Table structure for table `Rating`
--

CREATE TABLE `Rating` (
  `Wine_ID` int(64) NOT NULL,
  `User_ID` int(64) NOT NULL,
  `Rating` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Rating`
--

INSERT INTO `Rating` (`Wine_ID`, `User_ID`, `Rating`) VALUES
(1, 1, 1),
(1, 2, 1),
(1, 3, 1),
(1, 4, 1),
(1, 5, 1),
(1, 6, 1),
(1, 35, 5),
(2, 4, 4),
(2, 5, 4),
(2, 6, 4),
(2, 7, 4),
(2, 13, 3),
(3, 4, 3),
(3, 5, 3),
(3, 6, 3),
(3, 7, 3),
(4, 4, 4),
(4, 5, 1),
(4, 6, 4),
(4, 7, 1),
(5, 4, 2),
(5, 5, 3),
(5, 6, 2),
(5, 7, 3),
(5, 8, 2),
(5, 30, 1),
(7, 3, 2),
(9, 35, 1),
(12, 18, 3),
(15, 27, 4),
(17, 23, 2),
(19, 10, 3),
(21, 1, 4),
(23, 35, 3),
(26, 14, 1),
(29, 20, 4);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `User_ID` int(64) NOT NULL,
  `First_Name` varchar(32) NOT NULL,
  `Last_Name` varchar(32) NOT NULL,
  `Is_Expert` tinyint(1) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`User_ID`, `First_Name`, `Last_Name`, `Is_Expert`, `Email`, `Password`) VALUES
(1, 'Jayson', 'Du Toit', 1, '', ''),
(2, 'Emma', 'Johnson', 0, '', ''),
(3, 'Timothy', 'Whitaker', 1, '', ''),
(4, 'Olivia', 'Brown', 0, '', ''),
(5, 'Scott', 'Bebington', 1, '', ''),
(6, 'Sophia', 'Davis', 0, '', ''),
(7, 'Ethan', 'Groenendyk', 0, '', ''),
(8, 'Ava', 'Wilson', 0, '', ''),
(9, 'Charlize', 'Hanekom', 1, '', ''),
(10, 'Mia', 'Anderson', 0, '', ''),
(11, 'Benjamin', 'Thomas', 1, '', ''),
(12, 'Charlotte', 'Martinez', 0, '', ''),
(13, 'Logan', 'Hernandez', 1, '', ''),
(14, 'Amelia', 'Lopez', 0, '', ''),
(15, 'Henry', 'Gonzalez', 1, '', ''),
(16, 'Harper', 'Nelson', 0, '', ''),
(17, 'Elijah', 'Moore', 1, '', ''),
(18, 'Evelyn', 'Clark', 0, '', ''),
(19, 'Sebastian', 'Lee', 1, '', ''),
(20, 'Avery', 'Lewis', 0, '', ''),
(21, 'Jackson', 'Wright', 1, '', ''),
(22, 'Lily', 'Walker', 0, '', ''),
(23, 'Andrew', 'Hall', 1, '', ''),
(24, 'Grace', 'Allen', 0, '', ''),
(25, 'Lucas', 'Young', 1, '', ''),
(26, 'Nora', 'King', 0, '', ''),
(27, 'Carter', 'Baker', 1, '', ''),
(28, 'Sofia', 'Green', 0, '', ''),
(29, 'Jack', 'Hill', 1, '', ''),
(30, 'Emily', 'Adams', 0, '', ''),
(31, 'Timothy', 'Whitaker', 0, 'timothymdevilliers@gmail.com', '$2y$10$p4nqcz3JCTXNPKmHB4y95O2w7sc9tohqSkl43vwp2USFvDcIYnSuO'),
(34, 'Scott', 'IsVeryUgly', 0, 'ScottisUgly@gmail.com', '$2y$10$o6ebK1QTKXs6sWeH5naMxe7lT242jP6t2XjR035QrWneObxotreN6'),
(35, 'Scott', 'Bebington', 1, 'scottbebington@gmail.com', '$2y$10$pCJ5H.IAPdcxf4njoK/HDuTw/5G18M7F56EVGlld6jYAAzjjdADCe');

-- --------------------------------------------------------

--
-- Table structure for table `Wine`
--

CREATE TABLE `Wine` (
  `Wine_ID` int(64) NOT NULL,
  `Winery_ID` int(64) NOT NULL,
  `Name` varchar(64) NOT NULL,
  `Year` int(4) NOT NULL,
  `Type` varchar(64) NOT NULL,
  `Image` varchar(10000) NOT NULL,
  `Price` int(10) NOT NULL,
  `Available` tinyint(1) NOT NULL,
  `Category` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Wine`
--

INSERT INTO `Wine` (`Wine_ID`, `Winery_ID`, `Name`, `Year`, `Type`, `Image`, `Price`, `Available`, `Category`) VALUES
(1, 1, 'Château Kirwan Margaux Private Selection', 2018, 'Bordeaux', 'https://shoprite-ecommerce-prod-cdn.azureedge.net/sys-master-images/h89/h1b/9533573595166/300Wx300H_10764887EA_checkers1200Wx1200H', 550, 1, 'Red'),
(2, 2, 'Château Belle-Brise Pomerol', 2014, 'Bordeaux', 'https://www.greatdomaines.co.za/wp-content/uploads/2023/05/ChC3A2teau-Belle-Brise-Pomerol-2014.jpg', 2995, 0, 'Red'),
(3, 3, 'Clos Ancestral', 2021, 'Penedès', 'https://www.petitceller.com/media/catalog/product/cache/b84f52580dd945164499b76277f79bd2/1/5/15814a9e7627b981448eed0f176fec04165e9bccda1aa875ee13f8f229bac3c6.jpeg', 316, 1, 'Red'),
(4, 4, 'Sassicaia Bolgheri', 2010, 'Sassicaia ', 'https://www.wine-searcher.com/images/labels/38/06/10593806.jpg?width=260&height=260&fit=bounds&canvas=260,260', 6431, 0, 'Red'),
(5, 5, 'Grange', 2018, 'Shiraz', 'https://www.penfolds.com/on/demandware.static/-/Sites-twe-master-catalog/default/dwda69f17c/images/Penfolds%202022/PEN+2018+AUSCOLL+Grange+Shz+FL750+Cork.png', 1500, 1, 'Red'),
(6, 6, 'Cabassaou cuvée', 2003, 'Shiraz', 'https://www.domainetempier.com/wp-content/uploads/2019/07/cabassaoua.jpg', 2791, 0, 'Red'),
(7, 7, 'Crimson Velvet', 2019, 'Zinfandel', 'https://www.winemag.com/wp-content/uploads/2021/10/HERO_Strcutural_Elements_of-Wine_GettyImages-1233242907_1920x1280.jpg', 200, 1, 'Red'),
(8, 8, 'Emporda Bordeaux', 2012, 'Emporda ', 'https://images.vivino.com/thumbs/ApnIiXjcT5Kc33OHgNb9dA_375x500.jpg', 490, 0, 'Red'),
(9, 9, 'Tenuta Guado al Tasso', 2013, 'Matarocchio', 'https://images.vivino.com/thumbs/TEdvvuFFR86UIEyXHuy8Vw_pb_x300.png', 550, 1, 'Red'),
(10, 10, 'Amarone della Valpolicella Riserva N.V', 2016, 'Reserva', 'https://images.vivino.com/thumbs/nC9V6L2mQQSq0s-wZLcaxw_pb_x300.png', 100, 0, 'Red'),
(11, 11, 'Gaia & Rey Langhe', 2011, 'Langhe', 'https://images.vivino.com/thumbs/5K9sXX9CQ8eonyEU71IlDA_pb_x300.png', 1200, 1, 'White'),
(12, 12, 'MontrachetReserve', 2010, 'Grand Cru', 'https://images.vivino.com/thumbs/rORmihtxSrKG7SfuI0bD6w_pb_x300.png', 400, 0, 'White'),
(13, 13, 'Bâtard-Montrachet', 1996, 'Grand Cru', 'https://images.vivino.com/thumbs/EDQ4q_3FQ568NVspQBECug_pb_x300.png', 3990, 1, 'White'),
(14, 14, 'Montrachet Grand Cru Marquis de Laguiche', 2004, 'Grand Cru', 'https://images.vivino.com/thumbs/1QoFUeYqQaCU07v4MBx8yw_pb_x300.png', 398, 0, 'White'),
(15, 15, 'Meursault Les', 2005, 'Rougeots ', 'https://images.vivino.com/thumbs/l5W5NRvZR_SzClIDSnG5Ag_pb_x300.png', 111, 1, 'White'),
(16, 16, 'Corton Charlemagne', 2015, 'Grand Cru', 'https://images.vivino.com/thumbs/npJNfRLlTtqqmoSCrsn2Kw_pb_x300.png', 224, 0, 'White'),
(17, 17, 'G-Max', 2009, 'Riesling ', 'https://images.vivino.com/thumbs/_tbErBvfQ3CcDGgJf-I6Dw_pb_x300.png', 455, 1, 'White'),
(18, 18, 'Unendlich', 2007, 'Riesling ', 'https://images.vivino.com/thumbs/Clc1N_neRBq_orOAKw9aqg_pb_x300.png', 245, 0, 'White'),
(19, 19, 'Meursault Les', 2004, 'Rougeots ', 'https://images.vivino.com/thumbs/l5W5NRvZR_SzClIDSnG5Ag_pb_x300.png', 543, 1, 'White'),
(20, 20, 'Grand Cru Classé de Graves', 2008, 'Pessac-Léognan Blanc', 'https://images.vivino.com/thumbs/EvtJOugzTx-HZXZfdZvTsA_pb_x300.png', 340, 0, 'White'),
(21, 31, 'Angelicall', 2014, 'Grenache Rosé', 'https://images.vivino.com/thumbs/LRmcfSasTD22xR6lRSKcIw_pb_x300.png', 720, 1, 'Rose'),
(23, 23, 'Fonte de Medici', 2011, 'Zinfandel Rosé', 'https://images.vivino.com/highlights/icon/top_ranked.svg', 345, 1, 'Rose'),
(24, 24, '281', 2014, 'Pinot Noir Rosé', 'https://images.vivino.com/thumbs/CRBSmK3xRuqHdCg4TpBpVw_pb_x300.png', 169, 0, 'Rose'),
(25, 25, 'Garrus ', 2017, 'Merlot Rosé', 'https://images.vivino.com/thumbs/NGq7QIE3QwSE0cAKrvPuTA_pb_x300.png', 333, 1, 'Rose'),
(26, 25, 'Garrus', 2010, 'Cabernet Sauvignon Rosé', 'https://images.vivino.com/thumbs/NGq7QIE3QwSE0cAKrvPuTA_pb_x300.png', 234, 0, 'Rose'),
(28, 31, 'Angelicall ', 2013, 'Grenache Blanc Rosé', 'https://images.vivino.com/thumbs/LRmcfSasTD22xR6lRSKcIw_pb_x300.png', 342, 0, 'Rose'),
(29, 24, 'Rosé et Or', 2018, 'Cinsault Rosé', 'https://images.vivino.com/thumbs/xkMPG20ZS5mehP-XH0iBXg_pb_x300.png', 323, 1, 'Rose'),
(31, 26, 'Clos dAmbonnay Blanc de Noirs', 1995, 'Brut Champagne ', 'https://images.vivino.com/thumbs/DPq0ayGPR4SBeTDsYzLiiA_pb_x300.png', 569, 1, 'Sparkling'),
(32, 27, 'La Vigne Aux', 1957, 'Gamins ', 'https://images.vivino.com/thumbs/ZmVTfovvQhSXkCbHCiegWg_pb_x300.png', 4670, 1, 'Sparkling'),
(33, 28, 'Rosso Dolce', 1970, 'Sweet Red ', 'https://images.vivino.com/thumbs/tg3Ey_-wQsqFx7qOujbogw_pb_x300.png', 3331, 1, 'Sparkling'),
(34, 27, 'La Vigne Aux', 2004, 'Gamins', 'https://images.vivino.com/thumbs/ZmVTfovvQhSXkCbHCiegWg_pb_x300.png', 1500, 1, 'Sparkling'),
(35, 27, 'La Vigne Aux', 2023, 'Gamins', 'https://images.vivino.com/thumbs/ZmVTfovvQhSXkCbHCiegWg_pb_x300.png', 400, 0, 'Sparkling'),
(36, 26, 'Brut Champagne', 2006, 'Brut Champagne', 'https://images.vivino.com/thumbs/hHWcWh-GS52nYUL9t0Yy-Q_pb_x300.png', 350, 0, 'Sparkling'),
(37, 26, 'Brut Champagne', 2010, 'Brut Champagne', 'https://images.vivino.com/thumbs/hHWcWh-GS52nYUL9t0Yy-Q_pb_x300.png', 300, 0, 'Sparkling'),
(38, 26, 'Clos dAmbonnay Blanc de Noirs', 1885, 'Brut Champagne', 'https://images.vivino.com/thumbs/xtWMPmF6RtKFoWz3kpxz4Q_pb_x300.png', 300, 1, 'Sparkling'),
(39, 29, 'Vin de Constance', 2015, 'Natural Sweet ', 'https://images.vivino.com/thumbs/EKZ0KF4gS4eVwXbsNs-jyQ_pb_x300.png', 250, 1, 'Dessert'),
(40, 29, 'Vin de Constance', 2005, 'Natural Sweet ', 'https://images.vivino.com/thumbs/EKZ0KF4gS4eVwXbsNs-jyQ_pb_x300.png', 550, 1, 'Dessert'),
(41, 29, 'Vin de Constance', 2012, 'Natural Sweet ', 'https://images.vivino.com/thumbs/EKZ0KF4gS4eVwXbsNs-jyQ_pb_x300.png', 250, 1, 'Dessert'),
(42, 30, 'Tokaji Aszú 6', 2005, 'Puttonyos ', 'https://images.vivino.com/thumbs/A_ZXkuF6TSO7uwtUKswu5g_pb_x300.png', 69, 0, 'Dessert'),
(43, 30, 'Tokaji Aszú 3', 1999, 'Puttonyos ', 'https://images.vivino.com/thumbs/uqzOXD3lRViAJ7vkZq2Iww_pb_x300.png', 800, 1, 'Dessert'),
(44, 30, 'Tokaji Aszú 6', 2023, 'Puttonyos ', 'https://images.vivino.com/thumbs/A_ZXkuF6TSO7uwtUKswu5g_pb_x300.png', 120, 1, 'Dessert');

-- --------------------------------------------------------

--
-- Table structure for table `Winery`
--

CREATE TABLE `Winery` (
  `Winery_ID` int(64) NOT NULL,
  `Name` varchar(64) NOT NULL,
  `Wine_Tasting` tinyint(1) NOT NULL DEFAULT 1,
  `Admin_ID` int(64) NOT NULL,
  `Location_ID` int(64) NOT NULL,
  `Image` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Winery`
--

INSERT INTO `Winery` (`Winery_ID`, `Name`, `Wine_Tasting`, `Admin_ID`, `Location_ID`, `Image`) VALUES
(1, 'Château Margaux', 1, 1, 1, 'https://sothebys-md.brightspotcdn.com/6b/0c/ec9a23ca4629b07dd2dd70d2ad5c/008n09407-xxxxx-chateau-backyard.jpg'),
(2, 'Domaine de la Romanée', 0, 2, 3, 'https://www.christies.com/media-library/images/features/articles/2022/04/domaine-de-la-romanee-conti/drc-hero-880-550.jpg'),
(3, 'Bodegas Torres', 1, 3, 5, 'https://cmsmultimedia.catalunya.com/mds/multimedia/540578/F1/'),
(4, 'Tenuta San Guido', 1, 4, 2, 'https://italysfinestwines.it/wp-content/uploads/2021/07/tenuta-sanguido20212.jpg'),
(5, 'Penfolds', 1, 5, 4, 'https://res.cloudinary.com/winecom/image/upload/x3gzjk7xhhxvqcccl0va'),
(6, 'Domaine Tempier', 1, 6, 6, 'https://www.domainetempier.com/wp-content/uploads/2019/09/tempier_bastide-750x475.jpg'),
(7, 'Viña Concha y Toro', 1, 7, 8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz7bIjzpoDelzWmYUgDTfj0q8PM9YCJVvUSQ&usqp=CAU'),
(8, 'Maselva', 1, 8, 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw_4xwjvdvScc59qYuv4dSqizzJzv4EcqadQ&usqp=CAU'),
(9, 'Antinori', 0, 9, 7, 'https://data.callmewine.com/imgmarca/distilleria-antinori_9728.jpg'),
(10, 'Ernesto Ruffo', 1, 10, 9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOIDnDFUoSqedZKl--H1Wr-GPN9N4LOa0rXQ&usqp=CAU'),
(11, 'Gaja', 1, 11, 11, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCJTX6tGcPnbKCEUs2dHpguKZQ00CrWfketQ&usqp=CAU'),
(12, 'Domaine de La Greekee', 0, 12, 13, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLedalDK4MG8_-ga39w65Rq6jEc-O4bOU-UQ&usqp=CAU'),
(13, 'Domaine Leflaive', 1, 13, 12, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdAqYFCWFycLV1eyboukYYuQjgcaAv3jCF5A&usqp=CAU'),
(14, 'Joseph Drouhin', 1, 14, 15, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0x5M3e2ULJbhs7yxeAGRS6NJhVCghvw5zwA&usqp=CAU'),
(15, 'Domaine Coche-Dury', 1, 15, 17, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFKsPjye7hJHQgeoBal7esPVI1XrxsnLcfVA&usqp=CAU'),
(16, 'Patrick Javillier', 1, 16, 16, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvDt5J49upUT1B7jOgur0SIfRKxVtQnDh7_Q&usqp=CAU'),
(17, 'Keller', 1, 17, 14, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0VeGI7Wh4Rru7Sjw57RyDa0-Ynoyw7p6DiA&usqp=CAU'),
(18, 'F.X. Pichler', 1, 18, 18, 'https://www.researchgate.net/publication/319601053/figure/fig12/AS:536934440681479@1505026554914/FXPichler-Winery-Source-http-wwwloxpixcom-spaces-winery-Accessed-19-April-2017.png'),
(19, 'Domaine Coche-Lavaut', 0, 19, 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxZFgrXYAkCIRqF9ATFHvSZ9UhXZSIjQ-8Nw&usqp=CAU'),
(20, 'Château Haut-Brion', 0, 20, 19, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi6WqWV7em9p-AYhNHIrf7SHEKg37Br82dIw&usqp=CAU'),
(23, 'Antinori\'s Nuts And Wine', 1, 23, 22, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI0IKQ4HW8Hau3do8uEditbnCnX8faIATgfw&usqp=CAU'),
(24, 'Minuty', 1, 24, 24, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58ENvOjkFt8nvsWmzxISa24xjy-ehU_ZuNg&usqp=CAU'),
(25, 'Château d Esclans', 1, 25, 25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-dvxqsQuZCBi-BDBHq4YqIXjS1m86v-Q_tw&usqp=CAU'),
(26, 'Krug', 1, 26, 26, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCoBb3Y66t-iQvtVR5zemvwflxO0Zavv5ySQ&usqp=CAU'),
(27, 'Thienot', 0, 27, 27, 'https://www.arvitis.com/wp-content/uploads/2020/10/chateau-Le-Boscq-cru-bourgeois-saint-estephe_BD-1-1024x478.jpg'),
(28, 'Roscato', 0, 28, 28, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVxvJV4EA5esEsHHEQhrtHLDMXcVnTNadVay74UEZyS36FzGaQEW21v6BQjjgNlaHJ6nk&usqp=CAU'),
(29, 'Klein Constantia', 0, 1, 29, 'https://www.myleisuregroup.com/images/library/849x556/_1506415979-18222701_klein%20constantia.jpg'),
(30, 'Oremus', 0, 31, 30, 'https://lh3.googleusercontent.com/p/AF1QipNxdyRu3x3ajvyhcze5Z_yOTrGPxZe0_NKtIG6J=s680-w680-h510'),
(31, 'Antica Terra', 1, 35, 21, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVHw6HSkiEns-u6XDgRgRUTIPkteljdtlS8w&usqp=CAU');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Location`
--
ALTER TABLE `Location`
  ADD PRIMARY KEY (`Location_ID`);

--
-- Indexes for table `Rating`
--
ALTER TABLE `Rating`
  ADD UNIQUE KEY `Composite` (`Wine_ID`,`User_ID`),
  ADD KEY `user` (`User_ID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`User_ID`);

--
-- Indexes for table `Wine`
--
ALTER TABLE `Wine`
  ADD PRIMARY KEY (`Wine_ID`),
  ADD KEY `WINE are you straightn't` (`Winery_ID`);

--
-- Indexes for table `Winery`
--
ALTER TABLE `Winery`
  ADD PRIMARY KEY (`Winery_ID`),
  ADD KEY `WORK YOU DUMMY` (`Admin_ID`),
  ADD KEY `PLEASE` (`Location_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Location`
--
ALTER TABLE `Location`
  MODIFY `Location_ID` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `User_ID` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `Wine`
--
ALTER TABLE `Wine`
  MODIFY `Wine_ID` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `Winery`
--
ALTER TABLE `Winery`
  MODIFY `Winery_ID` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Rating`
--
ALTER TABLE `Rating`
  ADD CONSTRAINT `user` FOREIGN KEY (`User_ID`) REFERENCES `User` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `wine` FOREIGN KEY (`Wine_ID`) REFERENCES `Wine` (`Wine_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Wine`
--
ALTER TABLE `Wine`
  ADD CONSTRAINT `WINE are you straightn't` FOREIGN KEY (`Winery_ID`) REFERENCES `Winery` (`Winery_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Winery`
--
ALTER TABLE `Winery`
  ADD CONSTRAINT `PLEASE` FOREIGN KEY (`Location_ID`) REFERENCES `Location` (`Location_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `WORK YOU DUMMY` FOREIGN KEY (`Admin_ID`) REFERENCES `User` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
