'use client'

import { useRef }
import { motion } from 'framer-motion' from 'react'


const skillCategories = [
  {
    category: 'Smart Contracts',
    skills: [
      { name: 'Solidity', level: 95 },
      { name: 'Rust', level: 85 },
      { name: 'Vyper', level: 80 },
    ],
  },
  {
    category: 'Security Analysis',
    skills: [
      { name: 'Static Analysis', level: 98 },
      { name: 'Dynamic Testing', level: 92 },
      { name: 'Formal Verification', level: 88 },
    ],
  },
  {
    category: 'Tools & Frameworks',
    skills: [
      { name: 'Foundry', level: 96 },
      { name: 'Hardhat', level: 90 },
      { name: 'Truffle', level: 85 },
    ],
  },
]

export function Skills() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

