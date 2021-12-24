CREATE DATABASE IF NOT EXISTS smartialart;

CREATE TABLE IF NOT EXISTS `smartialart`.`user` (
    `id` INT NOT NULL UNIQUE AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `smartialart`.`training` (
    `id` INT NOT NULL UNIQUE AUTO_INCREMENT,
    `userId` INT NOT NULL,
    `hours` INT NOT NULL,
    `date` DATETIME NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);