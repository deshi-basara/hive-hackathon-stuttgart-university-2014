-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 29, 2014 at 04:38 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `hive-dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `annotation`
--

CREATE TABLE IF NOT EXISTS `annotation` (
  `doc` int(11) DEFAULT NULL,
  `owner` int(11) DEFAULT NULL,
  `page` int(11) DEFAULT NULL,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
`id` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `annotation`
--

INSERT INTO `annotation` (`doc`, `owner`, `page`, `x`, `y`, `content`, `id`, `createdAt`, `updatedAt`) VALUES
(5, 1, 12, 20, 50, 'Das gefaellt nicht.', 1, '2014-11-29 15:03:38', '2014-11-29 15:03:38'),
(6, 1, 12, 20, 50, 'Das gefaellt nicht.1', 2, '2014-11-29 15:16:17', '2014-11-29 15:16:17'),
(6, 1, 12, 20, 50, 'Das gefaellt nicht.2', 3, '2014-11-29 15:16:27', '2014-11-29 15:16:27');

-- --------------------------------------------------------

--
-- Table structure for table `doc`
--

CREATE TABLE IF NOT EXISTS `doc` (
  `name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `owner` int(11) DEFAULT NULL,
  `room` int(11) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
`id` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doc`
--

INSERT INTO `doc` (`name`, `path`, `owner`, `room`, `deleted`, `id`, `createdAt`, `updatedAt`) VALUES
('doc5', 'asdf', 1, 1, 0, 5, '2014-11-29 14:00:40', '2014-11-29 14:00:40'),
('doc6', 'fdsa', 1, 2, 0, 6, '2014-11-29 14:36:44', '2014-11-29 14:36:44');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE IF NOT EXISTS `room` (
  `owner` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `visible` tinyint(1) DEFAULT NULL,
`id` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`owner`, `name`, `location`, `visible`, `id`, `createdAt`, `updatedAt`) VALUES
(1, 'room1', 'here', 1, 1, '2014-11-29 12:39:44', '2014-11-29 12:39:44'),
(1, 'room2', 'there', 1, 2, '2014-11-29 14:35:23', '2014-11-29 14:35:23'),
(1, 'room3', 'here', 0, 3, '2014-11-29 16:28:26', '2014-11-29 16:28:26'),
(1, 'room4', 'there', 0, 4, '2014-11-29 16:28:36', '2014-11-29 16:28:36');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
`id` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `encrypted_password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `email`, `role`, `id`, `createdAt`, `updatedAt`, `encrypted_password`) VALUES
('student', 'student@hs-furtwangen.de', 'student', 1, '2014-11-29 12:14:53', '2014-11-29 12:14:53', 'moin'),
('professor', 'professor@hs-furtwangen.de', 'professor', 2, '2014-11-29 16:31:09', '2014-11-29 16:31:09', 'moin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `annotation`
--
ALTER TABLE `annotation`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doc`
--
ALTER TABLE `doc`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `annotation`
--
ALTER TABLE `annotation`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `doc`
--
ALTER TABLE `doc`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
