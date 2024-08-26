-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2024 at 10:42 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `signup`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `companyname` varchar(255) DEFAULT NULL,
  `issuper` tinyint(1) DEFAULT 0,
  `isWorkshop` tinyint(1) DEFAULT 0,
  `otp` varchar(6) DEFAULT NULL,
  `otpExpiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `name`, `email`, `password`, `department`, `mobile`, `companyname`, `issuper`, `isWorkshop`, `otp`, `otpExpiry`) VALUES
(1, 'sjebch', 'ayushi@gmail.com', 'aedqkwdkqwd', NULL, NULL, NULL, 0, 0, NULL, NULL),
(2, 'awdqaw', 'awdwa@wkejrnf.com', 'qadeqw', NULL, NULL, NULL, 0, 0, NULL, NULL),
(4, 'ecfafe', 'ayushipj2209@gmail.com', 'sefcwefew', NULL, NULL, NULL, 0, 0, NULL, NULL),
(5, 'ayushi', 'ayushipiku@gmail.com', 'ayushipiku', NULL, NULL, NULL, 0, 0, NULL, NULL),
(7, '2q3ed', 'wedw3@gmekfc.com', 'wedwed', NULL, NULL, NULL, 0, 0, NULL, NULL),
(9, 'edcwe', 'ayus2323hi@gmail.com', 'ayushi1', 'kwenkcfwne', '8934892898', 'sedcklesml', 0, 0, NULL, NULL),
(10, 'frcwe', 'ayushipj22309@gmail.com', '3434e3344334', 'efwe', '9537116310', 'rcferf', 0, 0, NULL, NULL),
(15, 'boric14898@egela.com', 'ayushipj2209@gmail.com3', 'ayushipj2209@gmail.com3', 'wedqwedqwd', '9537116310', 'Brainvire infotech', 0, 0, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
