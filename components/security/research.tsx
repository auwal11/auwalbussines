'use client'

import { useRef }
import { motion } from 'framer-motion' from 'react'


const research = [
  {
    id: 1,
    title: 'The Evolution of Flash Loan Attacks',
    date: 'Oct 2024',
    category: 'DeFi Security',
  },
  {
    id: 2,
    title: 'Formal Verification in Smart Contracts',
    date: 'Sep 2024',
    category: 'Research',
  },
  {
    id: 3,
    title: 'Zero-Knowledge Proof Vulnerabilities',
    date: 'Aug 2024',
    category: 'Cryptography',
  },
]

export function Research() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

