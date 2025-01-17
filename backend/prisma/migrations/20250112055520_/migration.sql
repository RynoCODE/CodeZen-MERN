-- CreateEnum
CREATE TYPE "languages" AS ENUM ('python', 'c', 'cpp');

-- CreateTable
CREATE TABLE "questions" (
    "question_id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "codes_run" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "language" "languages" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "codes_run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "code_submit" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "language" "languages" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "code_submit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_template" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "language" "languages" NOT NULL,
    "template" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "question_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testcases" (
    "id" SERIAL NOT NULL,
    "template_id" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "expected_output" TEXT NOT NULL,
    "main" TEXT NOT NULL,

    CONSTRAINT "testcases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "codes_run" ADD CONSTRAINT "codes_run_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "code_submit" ADD CONSTRAINT "code_submit_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_template" ADD CONSTRAINT "question_template_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testcases" ADD CONSTRAINT "testcases_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "question_template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
