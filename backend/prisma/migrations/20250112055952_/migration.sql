/*
  Warnings:

  - The values [python] on the enum `languages` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "languages_new" AS ENUM ('js', 'c', 'cpp');
ALTER TABLE "codes_run" ALTER COLUMN "language" TYPE "languages_new" USING ("language"::text::"languages_new");
ALTER TABLE "code_submit" ALTER COLUMN "language" TYPE "languages_new" USING ("language"::text::"languages_new");
ALTER TABLE "question_template" ALTER COLUMN "language" TYPE "languages_new" USING ("language"::text::"languages_new");
ALTER TYPE "languages" RENAME TO "languages_old";
ALTER TYPE "languages_new" RENAME TO "languages";
DROP TYPE "languages_old";
COMMIT;
