import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data (in sequence to avoid deadlocks)
    console.log("Deleting existing data...");
    await db.delete(schema.userProgress);
    console.log("✓ Deleted user progress");
    await db.delete(schema.challengeOptions);
    console.log("✓ Deleted challenge options");
    await db.delete(schema.challenges);
    console.log("✓ Deleted challenges");
    await db.delete(schema.lessons);
    console.log("✓ Deleted lessons");
    await db.delete(schema.units);
    console.log("✓ Deleted units");
    await db.delete(schema.courses);
    console.log("✓ Deleted courses");
    await db.delete(schema.userSubscription);
    console.log("✓ Deleted user subscriptions");
    console.log("Database cleared successfully!");

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([{ title: "Vietnamese Sign Language", imageSrc: "/vnflg.svg" }])
      .returning();

    // Insert Units
    const unitInsertions = [];
    for (const course of courses) {
      unitInsertions.push(
        {
          courseId: course.id,
          title: "Bài 1",
          description: `Cơ bản về ${course.title}`,
          order: 1,
        },
        {
          courseId: course.id,
          title: "Bài 2",
          description: `Trung cấp ${course.title}`,
          order: 2,
        }
      );
    }
    const units = await db
      .insert(schema.units)
      .values(unitInsertions)
      .returning();

    // Insert Lessons
    const lessonInsertions = [];
    for (const unit of units) {
      lessonInsertions.push(
        { unitId: unit.id, title: "Danh từ", order: 1, iconSrc: "/vnflg.svg" },
        { unitId: unit.id, title: "Động từ", order: 2, iconSrc: "/points.svg" },
        {
          unitId: unit.id,
          title: "Tính từ",
          order: 3,
          iconSrc: "/vnflg.svg",
        },
        { unitId: unit.id, title: "Cụm từ", order: 4, iconSrc: "/mascot.svg" },
        { unitId: unit.id, title: "Câu", order: 5, iconSrc: "/vnflg.svg" }
      );
    }
    const lessons = await db
      .insert(schema.lessons)
      .values(lessonInsertions)
      .returning();

    // Insert Challenges
    const challengeInsertions: (typeof schema.challenges.$inferInsert)[] = [];
    for (const lesson of lessons) {
      challengeInsertions.push(
        {
          lessonId: lesson.id,
          type: "VIDEO",
          question: "Xin chào",
          videoSrc: "/videos/xinchao.mp4",
          order: 1,
        },
        {
          lessonId: lesson.id,
          type: "VIDEO",
          question: "Gia đình",
          videoSrc: "/videos/fam.mp4",
          order: 2,
        },
        {
          lessonId: lesson.id,
          type: "ASSIST",
          question: "Ký hiệu này có nghĩa là gì?",
          videoSrc: "/videos/xinchao.mp4",
          order: 3,
        },
        {
          lessonId: lesson.id,
          type: "SELECT",
          question: 'Chọn ký hiệu cho "Sinh nhật"',
          videoSrc: null,
          order: 4,
        },
        {
          lessonId: lesson.id,
          type: "VIDEO",
          question: "Khoẻ",
          videoSrc: "/videos/khoe.mp4",
          order: 5,
        },
        {
          lessonId: lesson.id,
          type: "ASSIST",
          question: "Ký hiệu này có nghĩa là gì?",
          videoSrc: "/videos/sn.mp4",
          order: 6,
        },
        {
          lessonId: lesson.id,
          type: "ASSIST",
          question: "Ký hiệu này là gì?",
          videoSrc: "/videos/khoe.mp4",
          order: 7,
        },
        {
          lessonId: lesson.id,
          type: "ASSIST",
          question: "Ký hiệu này là gì?",
          videoSrc: "/videos/fam.mp4",
          order: 8,
        }
      );
    }
    const challenges = await db
      .insert(schema.challenges)
      .values(challengeInsertions)
      .returning();

    // Insert Challenge Options
    const challengeOptionInsertions: (typeof schema.challengeOptions.$inferInsert)[] =
      [];
    for (const challenge of challenges) {
      if (challenge.order === 1) {
        challengeOptionInsertions.push(
          {
            challengeId: challenge.id,
            correct: true,
            text: "Xin chào",
            imageSrc: null,
            audioSrc: null,
          },
          {
            challengeId: challenge.id,
            correct: false,
            text: "Tạm biệt",
            imageSrc: null,
            audioSrc: null,
          },
          {
            challengeId: challenge.id,
            correct: false,
            text: "Cảm ơn",
            imageSrc: null,
            audioSrc: null,
          }
        );
      }
      if (challenge.order === 2) {
        challengeOptionInsertions.push(
          {
            challengeId: challenge.id,
            correct: true,
            text: "Gia đình",
            imageSrc: null,
            audioSrc: null,
          },
          {
            challengeId: challenge.id,
            correct: false,
            text: "Bạn bè",
            imageSrc: null,
            audioSrc: null,
          },
          {
            challengeId: challenge.id,
            correct: false,
            text: "Đồng nghiệp",
            imageSrc: null,
            audioSrc: null,
          }
        );
      }
      if (challenge.order === 3) {
        challengeOptionInsertions.push(
          {
            challengeId: challenge.id,
            correct: true,
            text: "Xin chào",
            imageSrc: null,
            audioSrc: null,
          },
          {
            challengeId: challenge.id,
            correct: false,
            text: "Tạm biệt",
            imageSrc: null,
            audioSrc: null,
          },
          {
            challengeId: challenge.id,
            correct: false,
            text: "Cảm ơn",
            imageSrc: null,
            audioSrc: null,
          }
        );
      }
      if (challenge.order === 4) {
        challengeOptionInsertions.push(
          {
            challengeId: challenge.id,
            correct: true,
            text: "Sinh nhật",
            imageSrc: null,
            audioSrc: null,
            videoSrc: "/videos/sn.mp4",
          },
          {
            challengeId: challenge.id,
            correct: false,
            text: "Gia đình",
            imageSrc: null,
            audioSrc: null,
            videoSrc: "/videos/fam.mp4",
          },
          {
            challengeId: challenge.id,
            correct: false,
            text: "Xin chào",
            imageSrc: null,
            audioSrc: null,
            videoSrc: "/videos/xinchao.mp4",
          }
        );
      }
      if (challenge.order === 5) {
        challengeOptionInsertions.push(
          {
            challengeId: challenge.id,
            correct: true,
            text: "Tôi khoẻ",
            imageSrc: null,
            audioSrc: null,
          },
          {
            challengeId: challenge.id,
            correct: false,
            text: "Mệt mỏi",
            imageSrc: null,
            audioSrc: null,
          },
          {
            challengeId: challenge.id,
            correct: false,
            text: "Ốm",
            imageSrc: null,
            audioSrc: null,
          }
        );
      }
      if (challenge.order === 6) {
        challengeOptionInsertions.push(
          {
            challengeId: challenge.id,
            correct: false,
            text: "Giáng sinh",
            imageSrc: null,
            audioSrc: null,
          },
          {
            challengeId: challenge.id,
            correct: true,
            text: "Sinh nhật",
            imageSrc: null,
            audioSrc: null,
          },
          {
            challengeId: challenge.id,
            correct: false,
            text: "Năm mới",
            imageSrc: null,
            audioSrc: null,
          }
        );
      }
      if (challenge.order === 7) {
        challengeOptionInsertions.push(
          {
            challengeId: challenge.id,
            correct: true,
            text: "Tôi khoẻ",
            imageSrc: null,
            audioSrc: null,
          },
          {
            challengeId: challenge.id,
            correct: false,
            text: "Xin chào",
            imageSrc: null,
            audioSrc: null,
          },
          {
            challengeId: challenge.id,
            correct: false,
            text: "Tạm biệt",
            imageSrc: null,
            audioSrc: null,
          }
        );
      }
      if (challenge.order === 8) {
        challengeOptionInsertions.push(
          {
            challengeId: challenge.id,
            correct: false,
            text: "Bạn bè",
            imageSrc: null,
            audioSrc: null,
          },
          {
            challengeId: challenge.id,
            correct: true,
            text: "Gia đình",
            imageSrc: null,
            audioSrc: null,
          },
          {
            challengeId: challenge.id,
            correct: false,
            text: "Đồng nghiệp",
            imageSrc: null,
            audioSrc: null,
          }
        );
      }
    }

    // Chunk insert the challenge options as there can be a lot of them which might exceed neon's size constraints
    const chunkSize = 1000;
    for (let i = 0; i < challengeOptionInsertions.length; i += chunkSize) {
      const chunk = challengeOptionInsertions.slice(i, i + chunkSize);
      await db.insert(schema.challengeOptions).values(chunk);
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

void main();
