CREATE TABLE `awkward_towers`.`users`
  (
     `id`              INT NOT NULL auto_increment,
     `username`        VARCHAR(255) NOT NULL,
     `password`        VARCHAR(255) NOT NULL,
     `highest_score`   INT NOT NULL,
     `gold`            INT NOT NULL,
     `elo`             INT NOT NULL,
     `connected`       BOOLEAN NOT NULL,
     `last_connection` DATETIME NOT NULL,
     PRIMARY KEY (`id`)
  )

CREATE TABLE `awkward_towers`.`inventory`
  (
     `id`          INT NOT NULL,
     `user_id`     INT NOT NULL,
     `cosmetic_id` INT NOT NULL
  )

CREATE TABLE `awkward_towers`.`game`
  (
     `id`        INT NOT NULL auto_increment,
     `user_id_1` INT NOT NULL,
     `user_id_2` INT NOT NULL,
     `seed`      INT NOT NULL,
     `ended`     BOOLEAN NOT NULL,
     PRIMARY KEY (`id`)
  )

CREATE TABLE `awkward_towers`.`friend`
  (
     `id`        INT NOT NULL auto_increment,
     `user_id_1` INT NOT NULL,
     `user_id_2` INT NOT NULL,
     `added_at`  DATETIME NOT NULL,
     PRIMARY KEY (`id`)
  )

CREATE TABLE `awkward_towers`.`cosmetic`
  (
     `id`    INT NOT NULL auto_increment,
     `name`  VARCHAR(255) NOT NULL,
     `price` INT NOT NULL,
     `type`  VARCHAR(255) NOT NULL,
     PRIMARY KEY (`id`)
  )