import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create subjects
  const pythonSubject = await prisma.subject.upsert({
    where: { slug: 'python-programming' },
    update: {},
    create: {
      title: 'Python Programming',
      slug: 'python-programming',
      description: 'Learn Python programming from basics to advanced concepts with hands-on projects and real-world applications.',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
      isPublished: true,
    },
  });

  const dsaSubject = await prisma.subject.upsert({
    where: { slug: 'data-structures-algorithms' },
    update: {},
    create: {
      title: 'Data Structures & Algorithms',
      slug: 'data-structures-algorithms',
      description: 'Master DSA with comprehensive examples, practice problems, and interview preparation.',
      thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop',
      isPublished: true,
    },
  });

  const webDevSubject = await prisma.subject.upsert({
    where: { slug: 'web-development' },
    update: {},
    create: {
      title: 'Web Development',
      slug: 'web-development',
      description: 'Full-stack web development with modern technologies including React, Node.js, and more.',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
      isPublished: true,
    },
  });

  console.log('✅ Subjects created');

  // Create sections and videos for Python Programming
  const pythonSections = [
    {
      title: 'Introduction to Python',
      orderIndex: 0,
      videos: [
        {
          title: 'What is Python?',
          description: 'Learn about Python history, features, and applications',
          youtubeUrl: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
          orderIndex: 0,
          durationSeconds: 300,
        },
        {
          title: 'Setting Up Python Environment',
          description: 'Install Python and set up your development environment',
          youtubeUrl: 'https://www.youtube.com/watch?v=H2qlzrGTBqE',
          orderIndex: 1,
          durationSeconds: 420,
        },
        {
          title: 'Your First Python Program',
          description: 'Write and execute your first Python program',
          youtubeUrl: 'https://www.youtube.com/watch?v=Q7YK5qT8JkE',
          orderIndex: 2,
          durationSeconds: 360,
        },
      ],
    },
    {
      title: 'Python Basics',
      orderIndex: 1,
      videos: [
        {
          title: 'Variables and Data Types',
          description: 'Understanding variables, integers, strings, and booleans',
          youtubeUrl: 'https://www.youtube.com/watch?v=N4ZwAKd0a3A',
          orderIndex: 0,
          durationSeconds: 540,
        },
        {
          title: 'Input and Output Operations',
          description: 'Learn how to take input and display output in Python',
          youtubeUrl: 'https://www.youtube.com/watch?v=W9sW8pqRnxs',
          orderIndex: 1,
          durationSeconds: 480,
        },
        {
          title: 'Operators in Python',
          description: 'Arithmetic, comparison, and logical operators',
          youtubeUrl: 'https://www.youtube.com/watch?v=OxhPy7VUyI8',
          orderIndex: 2,
          durationSeconds: 600,
        },
      ],
    },
  ];

  // Create sections and videos for DSA
  const dsaSections = [
    {
      title: 'Arrays',
      orderIndex: 0,
      videos: [
        {
          title: 'Introduction to Arrays',
          description: 'Understanding arrays and their operations',
          youtubeUrl: 'https://www.youtube.com/watch?v=QJNwK2uJyKg',
          orderIndex: 0,
          durationSeconds: 420,
        },
        {
          title: 'Array Operations',
          description: 'Insert, delete, update, and traverse arrays',
          youtubeUrl: 'https://www.youtube.com/watch?v=Z1Y17qGjMAM',
          orderIndex: 1,
          durationSeconds: 540,
        },
      ],
    },
    {
      title: 'Linked Lists',
      orderIndex: 1,
      videos: [
        {
          title: 'Singly Linked List',
          description: 'Introduction to singly linked lists',
          youtubeUrl: 'https://www.youtube.com/watch?v=FsyyXlHJmJE',
          orderIndex: 0,
          durationSeconds: 600,
        },
        {
          title: 'Doubly Linked List',
          description: 'Understanding doubly linked lists',
          youtubeUrl: 'https://www.youtube.com/watch?v=JFozK4C_2xA',
          orderIndex: 1,
          durationSeconds: 660,
        },
      ],
    },
  ];

  // Create sections and videos for Web Development
  const webDevSections = [
    {
      title: 'HTML Fundamentals',
      orderIndex: 0,
      videos: [
        {
          title: 'Introduction to HTML',
          description: 'Learn the basics of HTML structure',
          youtubeUrl: 'https://www.youtube.com/watch?v=kUMe1FH4CHE',
          orderIndex: 0,
          durationSeconds: 480,
        },
        {
          title: 'HTML Forms and Tables',
          description: 'Creating forms and tables in HTML',
          youtubeUrl: 'https://www.youtube.com/watch?v=fM3F8vGvfRA',
          orderIndex: 1,
          durationSeconds: 540,
        },
      ],
    },
    {
      title: 'CSS Essentials',
      orderIndex: 1,
      videos: [
        {
          title: 'CSS Selectors and Properties',
          description: 'Master CSS selectors and common properties',
          youtubeUrl: 'https://www.youtube.com/watch?v=OXGznpKZ_sA',
          orderIndex: 0,
          durationSeconds: 600,
        },
        {
          title: 'Flexbox Layout',
          description: 'Learn CSS Flexbox for responsive layouts',
          youtubeUrl: 'https://www.youtube.com/watch?v=fYq5PXgSsbE',
          orderIndex: 1,
          durationSeconds: 720,
        },
      ],
    },
  ];

  // Create sections and videos for Python
  for (const sectionData of pythonSections) {
    const section = await prisma.section.create({
      data: {
        subjectId: pythonSubject.id,
        title: sectionData.title,
        orderIndex: sectionData.orderIndex,
      },
    });

    for (const videoData of sectionData.videos) {
      await prisma.video.create({
        data: {
          sectionId: section.id,
          ...videoData,
        },
      });
    }
  }

  // Create sections and videos for DSA
  for (const sectionData of dsaSections) {
    const section = await prisma.section.create({
      data: {
        subjectId: dsaSubject.id,
        title: sectionData.title,
        orderIndex: sectionData.orderIndex,
      },
    });

    for (const videoData of sectionData.videos) {
      await prisma.video.create({
        data: {
          sectionId: section.id,
          ...videoData,
        },
      });
    }
  }

  // Create sections and videos for Web Dev
  for (const sectionData of webDevSections) {
    const section = await prisma.section.create({
      data: {
        subjectId: webDevSubject.id,
        title: sectionData.title,
        orderIndex: sectionData.orderIndex,
      },
    });

    for (const videoData of sectionData.videos) {
      await prisma.video.create({
        data: {
          sectionId: section.id,
          ...videoData,
        },
      });
    }
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
