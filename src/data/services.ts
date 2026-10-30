import { AppWindow, Cloud, Cpu, Gauge, Server, ShieldCheck, Wrench } from 'lucide-react'
import type { Service } from './types'

/** Any length; numbering and "Service 0X / 0N" are derived from position. */
export const services: readonly Service[] = [
  {
    title: 'Full-Stack Web Applications',
    icon: AppWindow,
    desc: 'End-to-end product engineering with React, Next.js, TypeScript and Node.js — from data model and API to a polished, production-ready interface.',
    deliver: [
      'Scalable React / Next.js apps with SSR and SSG',
      'Typed, modular codebases that teams can grow',
      'Ownership from architecture through release and production support',
    ],
    metric: '5+',
    metricLabel: 'product modules architected end to end',
    where: 'Enbridge',
    stack: ['React 19', 'Next.js', 'TypeScript', 'Node.js'],
  },
  {
    title: 'Frontend Performance & Accessibility',
    icon: Gauge,
    desc: 'Fast, accessible interfaces tuned for Core Web Vitals and enterprise accessibility standards.',
    deliver: [
      'Code splitting, lazy loading, virtualization and caching',
      'Green Core Web Vitals and better SEO',
      'WCAG 2.1 AA, cross-browser responsive UIs',
    ],
    metric: '4s → 1.5s',
    metricLabel: 'dashboard load time',
    where: 'CIBC',
    stack: ['React Query', 'Redux', 'Redis', 'Tailwind CSS'],
  },
  {
    title: 'APIs & Microservices',
    icon: Server,
    desc: 'Secure RESTful APIs and modular Node.js microservices backed by well-designed data models.',
    deliver: [
      'Node.js / Express services with clean, layered architecture',
      'MongoDB and PostgreSQL schemas, indexes and query tuning',
      'Services built for high-throughput, transaction-heavy workloads',
    ],
    metric: '35%',
    metricLabel: 'higher API throughput',
    where: 'CIBC',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
  },
  {
    title: 'Authentication & Security',
    icon: ShieldCheck,
    desc: 'Banking-grade authentication and authorization that protects critical workflows without slowing users down.',
    deliver: [
      'OAuth 2.0 and JWT authentication flows',
      'Role-based access control (RBAC) middleware',
      'Secure session and token handling with Passport.js',
    ],
    metric: '50K+',
    metricLabel: 'daily banking transactions protected',
    where: 'CIBC',
    stack: ['OAuth 2.0', 'JWT', 'RBAC', 'Passport.js'],
  },
  {
    title: 'Cloud, Serverless & CI/CD',
    icon: Cloud,
    desc: 'Cloud-native systems on AWS, shipped through automated pipelines that make releases routine.',
    deliver: [
      'Serverless apps on AWS Lambda with CDK and SAM',
      'Containerized services on ECS Fargate with load balancing',
      'CI/CD with CodePipeline, CodeBuild and CodeDeploy',
    ],
    metric: '50%',
    metricLabel: 'faster release cycles, zero downtime',
    where: 'Hindustan Construction Co.',
    stack: ['AWS Lambda', 'ECS Fargate', 'Docker', 'CodePipeline'],
  },
  {
    title: 'AI-Assisted Delivery & Code Quality',
    icon: Cpu,
    desc: 'Faster delivery with AI coding tools, held to a rigorous review and testing bar — plus mentoring that lifts the whole team.',
    deliver: [
      'AI-assisted scaffolding, refactoring and test generation',
      'Unit, integration and end-to-end test suites',
      'Code reviews, mentoring and Agile sprint delivery',
    ],
    metric: '85%+',
    metricLabel: 'test coverage on banking services',
    where: 'CIBC',
    stack: ['Claude Code', 'Cursor', 'Jest', 'Selenium'],
  },
  {
    title: 'Website Maintenance & Support',
    icon: Wrench,
    desc: 'Keep production apps fast, secure and healthy long after launch — with monitoring, fixes and upgrades handled before they become problems.',
    deliver: [
      'Production monitoring and defect resolution with logs, DevTools and CloudWatch',
      'Performance profiling, dependency and framework upgrades',
      'Regression-safe releases backed by automated tests and CI/CD',
    ],
    metric: '25%',
    metricLabel: 'fewer regression incidents per release',
    where: 'CIBC',
    stack: ['AWS CloudWatch', 'Chrome DevTools', 'Jest', 'CI/CD'],
  },
]
