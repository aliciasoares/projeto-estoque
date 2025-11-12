-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para estoque
DROP DATABASE IF EXISTS `estoque`;
CREATE DATABASE IF NOT EXISTS `estoque` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `estoque`;

-- Copiando estrutura para tabela estoque.movimentacoes_estoque
DROP TABLE IF EXISTS `movimentacoes_estoque`;
CREATE TABLE IF NOT EXISTS `movimentacoes_estoque` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `produto_id` int(11) NOT NULL,
  `tipo_movimentacao` enum('ENTRADA','SAIDA') NOT NULL,
  `quantidade` int(11) NOT NULL,
  `data_movimentacao` datetime NOT NULL,
  `data_validade` date DEFAULT NULL,
  `responsavel` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `produto_id` (`produto_id`),
  CONSTRAINT `movimentacoes_estoque_ibfk_1` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela estoque.movimentacoes_estoque: ~1 rows (aproximadamente)
DELETE FROM `movimentacoes_estoque`;
INSERT INTO `movimentacoes_estoque` (`id`, `produto_id`, `tipo_movimentacao`, `quantidade`, `data_movimentacao`, `data_validade`, `responsavel`) VALUES
	(1, 1, 'ENTRADA', 30, '2025-11-11 18:12:38', '2026-03-30', 'Alice Recebimento');

-- Copiando estrutura para tabela estoque.produtos
DROP TABLE IF EXISTS `produtos`;
CREATE TABLE IF NOT EXISTS `produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `marca` varchar(100) DEFAULT NULL,
  `volume` varchar(50) DEFAULT NULL,
  `tipo_embalagem` varchar(100) DEFAULT NULL,
  `aplicacao` enum('domestica','industrial','hospitalar','outra') NOT NULL,
  `quantidade` int(11) NOT NULL DEFAULT 0,
  `estoque_minimo` int(11) NOT NULL DEFAULT 10,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela estoque.produtos: ~4 rows (aproximadamente)
DELETE FROM `produtos`;
INSERT INTO `produtos` (`id`, `nome`, `marca`, `volume`, `tipo_embalagem`, `aplicacao`, `quantidade`, `estoque_minimo`) VALUES
	(1, 'sabão em pó', 'OMO', '5Kg', 'saco plástico', 'industrial', 30, 10),
	(2, 'Amaciante', 'Downy', '5Kg', 'plástico', 'domestica', 0, 10),
	(3, 'Detergente Neutro', 'Limpa Fácil', '500ml', 'Plástica', 'domestica', 0, 10),
	(4, 'Sabonete Liquido', 'Omo', '2L', 'Plástico', 'domestica', 0, 10);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
