import type { Milestone } from './types'

/** Newest first. Chapter numbers count down from `experience.length`. */
export const experience: readonly Milestone[] = [
  {
    type: 'Experience',
    when: 'Jul 2025 — Present',
    title: 'Full Stack Developer',
    org: 'Enbridge · Calgary, AB',
    hash: 'a3f9c21',
    desc: 'Architecting enterprise web apps with React 19, Next.js (SSR/SSG) and TypeScript across 5+ product modules — 30% faster page loads and green Core Web Vitals in production. Designing secure Node.js microservices with OAuth 2.0 and JWT, and shipping WCAG 2.1 AA-compliant UIs.',
    tags: ['React 19', 'Next.js', 'Node.js', 'Redis', 'AWS CloudWatch'],
  },
  {
    type: 'Experience',
    when: 'Jan 2023 — Jul 2025',
    title: 'MERN Stack Developer',
    org: 'CIBC Bank · Toronto, ON',
    hash: '7be04d8',
    desc: 'Built high-traffic digital banking platforms and real-time dashboards processing 50,000+ daily transactions — 35% higher API throughput and dashboard loads cut from 4s to 1.5s. Engineered OAuth 2.0 / JWT / RBAC security, mentored junior developers, and reached 85%+ test coverage.',
    tags: ['React', 'Express.js', 'MongoDB', 'Passport.js', 'Jest'],
  },
  {
    type: 'Experience',
    when: 'May 2020 — Dec 2022',
    title: 'Software Developer',
    org: 'Hindustan Construction Company · Mumbai',
    hash: 'c51e6fa',
    desc: 'Designed cloud-native, serverless apps with AWS Lambda, CDK and SAM, reducing operational overhead by 40%. Ran containerized microservices on ECS Fargate and built CI/CD pipelines that made releases 50% faster with zero downtime.',
    tags: ['AWS Lambda', 'ECS Fargate', 'Docker', 'CodePipeline'],
  },
  {
    type: 'Experience',
    when: 'Jul 2018 — May 2020',
    title: 'Software Developer',
    org: 'Infosys · Pune',
    hash: '0d92b3e',
    desc: 'Developed scalable full-stack applications with React, Node.js and Express, improving development efficiency by 30%. Structured modular Node services and validated REST endpoints with Supertest and Jest.',
    tags: ['JavaScript', 'React', 'Express', 'Supertest'],
  },
  {
    type: 'Education',
    when: '2016 — 2018',
    title: 'M.Sc. in Information Technology',
    org: 'Kadi Sarva Vishwavidhyalaya · Gandhinagar',
    hash: 'e48a17c',
    tags: ['Information Technology'],
  },
  {
    type: 'Education',
    when: '2013 — 2016',
    title: 'Bachelor of Computer Applications',
    org: 'Gujarat University · Ahmedabad',
    hash: '91fd5b2',
    tags: ['Computer Applications'],
  },
]
