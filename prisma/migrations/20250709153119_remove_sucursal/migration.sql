/*
  Warnings:

  - You are about to drop the column `sucursalId` on the `stock` table. All the data in the column will be lost.
  - You are about to drop the `sucursal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `stock` DROP FOREIGN KEY `Stock_sucursalId_fkey`;

-- DropIndex
DROP INDEX `Stock_sucursalId_fkey` ON `stock`;

-- AlterTable
ALTER TABLE `stock` DROP COLUMN `sucursalId`;

-- DropTable
DROP TABLE `sucursal`;
