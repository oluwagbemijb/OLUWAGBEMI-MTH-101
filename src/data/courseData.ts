export interface WorkedExample {
  id: string;
  label: string;
  title: string;
  problem: string;
  steps: string[];
  finalAnswer: string;
}

export interface NoteItem {
  term?: string;
  content: string;
  formula?: string;
}

export interface ModuleSection {
  id: string;
  title: string;
  intro?: string;
  items: NoteItem[];
}

export interface QuickCheckQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseModule {
  id: number;
  code: string;
  title: string;
  shortTitle: string;
  weeks: string;
  hours: number;
  summary: string;
  labTitle: string;
  labDescription: string;
  sections: ModuleSection[];
  workedExamples: WorkedExample[];
  quickCheck: QuickCheckQuestion[];
}

export interface TutorialProblem {
  id: number;
  moduleId: number;
  topic: string;
  question: string;
  hint: string;
  solutionSteps: string[];
  answer: string;
  checkQuestion?: {
    prompt: string;
    options: string[];
    correctIndex: number;
  };
}

export interface TextbookRef {
  id: number;
  authors: string;
  title: string;
  publisher: string;
}

export const COURSE_METADATA = {
  code: 'MTH 101',
  title: 'Elementary Mathematics I (Algebra and Trigonometry)',
  creditUnits: '2 Units (Compulsory)',
  lectureHours: '30 Hours (2 hours per week for 15 weeks)',
  standard: 'National Universities Commission (NUC) Core Curriculum and Minimum Academic Standards (CCMAS)',
  overview:
    'This course provides foundational algebraic and trigonometric tools required for degree programmes in the Physical Sciences, Engineering, Computing, and related disciplines.',
};

export const LEARNING_OUTCOMES: string[] = [
  'Explain basic definitions of sets, subsets, union, intersection, complements, and use Venn diagrams;',
  'Solve quadratic equations and analyze the nature of their roots;',
  'Solve trigonometric functions and apply addition and factor formulae;',
  'Identify and classify various types of numbers; and',
  'Solve problems using the binomial theorem, mathematical induction, sequences, series, complex numbers, and De Moivre’s theorem.',
];

export const TEXTBOOKS: TextbookRef[] = [
  {
    id: 1,
    authors: 'Tuttuh-Adegun, M. R., & Adegoke, D. G.',
    title: 'Further Mathematics Project (Books 1–3)',
    publisher: 'Bounty Press, Ibadan',
  },
  {
    id: 2,
    authors: 'Backhouse, J. K., & Houldsworth, S. P. T.',
    title: 'Pure Mathematics (Books 1 & 2)',
    publisher: 'Longman',
  },
  {
    id: 3,
    authors: 'Stroud, K. A., & Booth, D. J.',
    title: 'Engineering Mathematics',
    publisher: 'Palgrave Macmillan',
  },
  {
    id: 4,
    authors: 'Lipschutz, S.',
    title: "Schaum's Outline of Set Theory and Related Topics",
    publisher: 'McGraw-Hill',
  },
  {
    id: 5,
    authors: 'Spiegel, M. R., & Moyer, R. E.',
    title: "Schaum's Outline of College Algebra",
    publisher: 'McGraw-Hill',
  },
];

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    code: 'Module 1',
    title: 'Elementary Set Theory and Venn Diagrams',
    shortTitle: 'Set Theory',
    weeks: 'Weeks 1–2',
    hours: 4,
    summary:
      'Well-defined collections, roster and set-builder notation, subsets, power sets, set operations, algebraic laws including De Morgan’s laws, and inclusion-exclusion cardinality formulae.',
    labTitle: 'Venn Diagram & Inclusion-Exclusion Lab',
    labDescription:
      'Inspect two-set algebraic operations (including De Morgan’s laws) on a discrete universe or adjust three-subject survey counts to verify cardinality formulas live.',
    sections: [
      {
        id: '1.1',
        title: '1.1 Basic Definitions',
        items: [
          {
            term: 'Set',
            content:
              'A well-defined collection of distinct objects. Objects in a set are called elements or members. If $x$ is an element of set $A$, we write $x \\in A$; otherwise, $x \\notin A$.',
          },
          {
            term: 'Roster / Listing Method',
            content: 'Elements are explicitly listed within braces: $A = \\{2, 4, 6, 8\\}$.',
          },
          {
            term: 'Set-Builder / Rule Method',
            content:
              'Elements are defined by a property rule: $A = \\{x : x \\text{ is an even integer and } 1 \\le x \\le 8\\}$.',
          },
          {
            term: 'Empty (Null) Set ($\\emptyset$ or $\\{\\}$)',
            content: 'A set containing no elements.',
          },
          {
            term: 'Singleton Set',
            content: 'A set with exactly one element, e.g., $\\{5\\}$.',
          },
          {
            term: 'Universal Set ($U$ or $\\mathcal{E}$)',
            content: 'The totality of all elements under consideration in a given context.',
          },
          {
            term: 'Cardinality ($n(A)$ or $|A|$)',
            content: 'The number of distinct elements in a finite set $A$.',
          },
        ],
      },
      {
        id: '1.2',
        title: '1.2 Subsets and Power Sets',
        items: [
          {
            term: 'Subset ($A \\subseteq B$)',
            content:
              'Set $A$ is a subset of $B$ if every element of $A$ is also an element of $B$. Every set is a subset of itself, and $\\emptyset$ is a subset of every set.',
          },
          {
            term: 'Proper Subset ($A \\subset B$)',
            content: '$A \\subseteq B$ and $A \\neq B$.',
          },
          {
            term: 'Equality of Sets ($A = B$)',
            content: '$A \\subseteq B$ and $B \\subseteq A$.',
          },
          {
            term: 'Power Set ($\\mathcal{P}(A)$)',
            content:
              'The set of all possible subsets of $A$. If $n(A) = k$, then $n(\\mathcal{P}(A)) = 2^k$.',
          },
        ],
      },
      {
        id: '1.3',
        title: '1.3 Set Operations',
        items: [
          {
            term: 'Union ($A \\cup B$)',
            content: '$\\{x : x \\in A \\text{ or } x \\in B\\}$',
          },
          {
            term: 'Intersection ($A \\cap B$)',
            content:
              '$\\{x : x \\in A \\text{ and } x \\in B\\}$. If $A \\cap B = \\emptyset$, $A$ and $B$ are disjoint.',
          },
          {
            term: "Complement ($A'$ or $A^c$)",
            content: '$\\{x : x \\in U \\text{ and } x \\notin A\\}$',
          },
          {
            term: 'Set Difference ($A - B$ or $A \\setminus B$)',
            content: "$\\{x : x \\in A \\text{ and } x \\notin B\\} = A \\cap B'$",
          },
          {
            term: 'Symmetric Difference ($A \\Delta B$)',
            content: '$(A - B) \\cup (B - A)$',
          },
        ],
      },
      {
        id: '1.4',
        title: '1.4 Laws of Set Algebra',
        items: [
          {
            term: 'Idempotent Laws',
            content: '$A \\cup A = A$, $\\quad A \\cap A = A$',
          },
          {
            term: 'Commutative Laws',
            content: '$A \\cup B = B \\cup A$, $\\quad A \\cap B = B \\cap A$',
          },
          {
            term: 'Associative Laws',
            content: '$(A \\cup B) \\cup C = A \\cup (B \\cup C)$, $\\quad (A \\cap B) \\cap C = A \\cap (B \\cap C)$',
          },
          {
            term: 'Distributive Laws',
            content:
              '$A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)$, $\\quad A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$',
          },
          {
            term: 'De Morgan’s Laws',
            content: "$(A \\cup B)' = A' \\cap B'$, $\\quad (A \\cap B)' = A' \\cup B'$",
          },
        ],
      },
      {
        id: '1.5',
        title: '1.5 Venn Diagrams and Cardinality Formulae',
        intro:
          'Venn diagrams use closed curves (usually circles) inside a rectangle representing $U$ to illustrate set relationships.',
        items: [
          {
            term: 'Two Finite Sets',
            content: 'Inclusion-exclusion principle for two sets:',
            formula: 'n(A \\cup B) = n(A) + n(B) - n(A \\cap B)',
          },
          {
            term: 'Three Finite Sets',
            content: 'Inclusion-exclusion principle for three sets:',
            formula:
              'n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A \\cap B) - n(A \\cap C) - n(B \\cap C) + n(A \\cap B \\cap C)',
          },
        ],
      },
    ],
    workedExamples: [
      {
        id: 'ex-1.1',
        label: 'Worked Example 1.1',
        title: 'Three-Subject Science Survey',
        problem:
          'In a survey of $60$ science students, $30$ offer Physics ($P$), $25$ offer Chemistry ($C$), and $20$ offer Biology ($B$). $12$ offer Physics and Chemistry, $10$ offer Physics and Biology, $8$ offer Chemistry and Biology, while $5$ offer all three subjects. Find the number of students who offer none of the three subjects.',
        steps: [
          'List the given cardinalities: $n(U) = 60$, $n(P) = 30$, $n(C) = 25$, $n(B) = 20$, $n(P \\cap C) = 12$, $n(P \\cap B) = 10$, $n(C \\cap B) = 8$, and $n(P \\cap C \\cap B) = 5$.',
          'Apply the 3-set inclusion-exclusion formula: $$n(P \\cup C \\cup B) = n(P) + n(C) + n(B) - n(P \\cap C) - n(P \\cap B) - n(C \\cap B) + n(P \\cap C \\cap B)$$',
          'Substitute values: $$n(P \\cup C \\cup B) = 30 + 25 + 20 - 12 - 10 - 8 + 5 = 50$$',
          'Subtract from the universal set: $\\text{Students offering none} = n(U) - n(P \\cup C \\cup B) = 60 - 50 = 10$.',
        ],
        finalAnswer: '$10$ students offer none of the three subjects.',
      },
    ],
    quickCheck: [
      {
        id: 'qc-1-1',
        prompt: 'If set $A$ has $n(A) = 4$ elements, how many elements are in its power set $\\mathcal{P}(A)$?',
        options: ['$8$', '$12$', '$16$', '$24$'],
        correctIndex: 2,
        explanation: 'The cardinality of a power set is $2^{n(A)} = 2^4 = 16$.',
      },
      {
        id: 'qc-1-2',
        prompt: "According to De Morgan's Law, $(A \\cap B)'$ is always equal to:",
        options: ["$A' \\cap B'$", "$A' \\cup B'$", "$A - B$", "$(A \\cup B)'$"],
        correctIndex: 1,
        explanation: "De Morgan's Law states $(A \\cap B)' = A' \\cup B'$ and $(A \\cup B)' = A' \\cap B'$.",
      },
    ],
  },
  {
    id: 2,
    code: 'Module 2',
    title: 'Number Systems',
    shortTitle: 'Number Systems',
    weeks: 'Week 3',
    hours: 2,
    summary:
      'Classification of Natural, Integer, Rational, Irrational, and Real numbers, Field Axioms of $\\mathbb{R}$, proof of irrationality by contradiction, and converting recurring decimals to fractions.',
    labTitle: 'Number Hierarchy & Recurring Decimal Lab',
    labDescription:
      'Classify numbers within $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ on an interactive number line, or convert any recurring decimal into a reduced rational fraction step-by-step.',
    sections: [
      {
        id: '2.1',
        title: '2.1 Classification of Numbers',
        items: [
          {
            term: 'Natural Numbers ($\\mathbb{N}$)',
            content: 'Counting numbers $\\{1, 2, 3, 4, \\dots\\}$. (Some conventions include $0$).',
          },
          {
            term: 'Integers ($\\mathbb{Z}$)',
            content: 'Positive and negative whole numbers including zero: $\\{\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots\\}$.',
          },
          {
            term: 'Rational Numbers ($\\mathbb{Q}$)',
            content:
              'Numbers expressible in the form $\\frac{p}{q}$ where $p, q \\in \\mathbb{Z}$ and $q \\neq 0$. Their decimal expansions either terminate (e.g., $\\frac{1}{4} = 0.25$) or repeat periodically (e.g., $\\frac{1}{3} = 0.333\\dots$).',
          },
          {
            term: "Irrational Numbers ($\\mathbb{Q}'$ or $\\mathbb{I}$)",
            content:
              'Real numbers that cannot be written as $\\frac{p}{q}$ ($p, q \\in \\mathbb{Z}, q \\neq 0$). Their decimals are non-terminating and non-recurring (e.g., $\\sqrt{2}, \\sqrt{3}, \\pi, e$).',
          },
          {
            term: 'Real Numbers ($\\mathbb{R}$)',
            content:
              'The union of rational and irrational numbers ($\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$). Every point on the continuous number line corresponds to a unique real number.',
            formula: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}',
          },
        ],
      },
      {
        id: '2.2',
        title: '2.2 Properties of Real Numbers',
        items: [
          {
            term: 'Field Axioms of $\\mathbb{R}$',
            content:
              'Under addition and multiplication, $\\mathbb{R}$ satisfies closure, commutativity, associativity, existence of additive identity ($0$) and multiplicative identity ($1$), existence of additive inverses ($-a$) and multiplicative inverses ($a^{-1}$ for $a \\neq 0$), and distributivity of multiplication over addition.',
          },
        ],
      },
    ],
    workedExamples: [
      {
        id: 'ex-2.1',
        label: 'Worked Example 2.1',
        title: 'Proof that $\\sqrt{2}$ is Irrational (by Contradiction)',
        problem: 'Prove that $\\sqrt{2}$ is irrational.',
        steps: [
          'Assume for the sake of contradiction that $\\sqrt{2}$ is rational. Then $\\sqrt{2} = \\frac{p}{q}$ where $p, q \\in \\mathbb{Z}$, $q \\neq 0$, and $\\gcd(p, q) = 1$ (reduced to lowest terms).',
          'Squaring both sides gives $2 = \\frac{p^2}{q^2} \\implies p^2 = 2q^2$.',
          'Since $p^2$ is even, $p$ must be even. Let $p = 2k$ for some $k \\in \\mathbb{Z}$.',
          'Substituting back: $(2k)^2 = 2q^2 \\implies 4k^2 = 2q^2 \\implies q^2 = 2k^2$. Thus $q^2$ is even, so $q$ is also even.',
          'This means $p$ and $q$ share a common factor of $2$, contradicting $\\gcd(p, q) = 1$. Therefore, $\\sqrt{2}$ is irrational.',
        ],
        finalAnswer: '$\\sqrt{2} \\in \\mathbb{I}$ (irrational), proved by contradiction.',
      },
      {
        id: 'ex-2.2',
        label: 'Worked Example 2.2',
        title: 'Converting Recurring Decimals',
        problem: 'Express $0.\\overline{27} = 0.272727\\dots$ as a fraction in lowest terms.',
        steps: [
          'Let $x = 0.272727\\dots$',
          'Multiply by $100$ (since $2$ digits repeat): $100x = 27.272727\\dots$',
          'Subtract the first equation from the second: $100x - x = 27 \\implies 99x = 27$.',
          'Divide and simplify by $\\gcd(27, 99) = 9$: $x = \\frac{27}{99} = \\frac{3}{11}$.',
        ],
        finalAnswer: '$0.\\overline{27} = \\frac{3}{11}$',
      },
    ],
    quickCheck: [
      {
        id: 'qc-2-1',
        prompt: 'Which inclusion chain accurately represents standard number sets?',
        options: [
          '$\\mathbb{Z} \\subset \\mathbb{N} \\subset \\mathbb{Q} \\subset \\mathbb{R}$',
          '$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$',
          '$\\mathbb{N} \\subset \\mathbb{Q} \\subset \\mathbb{Z} \\subset \\mathbb{R}$',
          '$\\mathbb{Q} \\subset \\mathbb{I} \\subset \\mathbb{R}$',
        ],
        correctIndex: 1,
        explanation: 'Every natural number is an integer, every integer is rational, and every rational number is real.',
      },
      {
        id: 'qc-2-2',
        prompt: 'What is the reduced rational form of $0.\\overline{36}$?',
        options: ['$\\frac{4}{11}$', '$\\frac{36}{100}$', '$\\frac{9}{25}$', '$\\frac{3}{11}$'],
        correctIndex: 0,
        explanation: '$99x = 36 \\implies x = \\frac{36}{99} = \\frac{4}{11}$.',
      },
    ],
  },
  {
    id: 3,
    code: 'Module 3',
    title: 'Principle of Mathematical Induction',
    shortTitle: 'Mathematical Induction',
    weeks: 'Week 4',
    hours: 2,
    summary:
      'Proving universal statements $P(n)$ over natural numbers $n \\ge n_0$ through Base Case, Inductive Hypothesis, and Inductive Step for summations and divisibility.',
    labTitle: 'Domino Induction Proof Stepper',
    labDescription:
      'Step through the formal three-stage induction structure and test arbitrary natural numbers $n$ to verify that the domino chain holds identically.',
    sections: [
      {
        id: '3.1',
        title: '3.1 The Principle of Mathematical Induction (PMI)',
        intro:
          'To prove that a mathematical statement $P(n)$ holds for all natural numbers $n \\ge n_0$ (usually $n_0 = 1$):',
        items: [
          {
            term: '1. Base Case',
            content: 'Verify that $P(n_0)$ is true.',
          },
          {
            term: '2. Inductive Hypothesis',
            content: 'Assume $P(k)$ is true for an arbitrary integer $k \\ge n_0$.',
          },
          {
            term: '3. Inductive Step',
            content: 'Using the assumption $P(k)$, prove that $P(k+1)$ is true.',
          },
          {
            term: '4. Conclusion',
            content: 'By the principle of mathematical induction, $P(n)$ is true for all $n \\ge n_0$.',
          },
        ],
      },
    ],
    workedExamples: [
      {
        id: 'ex-3.1',
        label: 'Worked Example 3.1',
        title: 'Summation Formula for Squares',
        problem:
          'Prove by mathematical induction that for all $n \\in \\mathbb{N}$: $$1^2 + 2^2 + 3^2 + \\dots + n^2 = \\frac{n(n+1)(2n+1)}{6}$$',
        steps: [
          '**Base Case ($n = 1$):** $\\text{LHS} = 1^2 = 1$, and $\\text{RHS} = \\frac{1(1+1)(2(1)+1)}{6} = \\frac{6}{6} = 1$. Hence $P(1)$ is true.',
          '**Inductive Hypothesis:** Assume $P(k)$ holds for some $k \\ge 1$: $$1^2 + 2^2 + \\dots + k^2 = \\frac{k(k+1)(2k+1)}{6}$$',
          '**Inductive Step ($n = k+1$):** Add $(k+1)^2$ to both sides: $$\\text{LHS} = \\left(1^2 + 2^2 + \\dots + k^2\\right) + (k+1)^2 = \\frac{k(k+1)(2k+1)}{6} + (k+1)^2$$',
          'Factor out $\\frac{k+1}{6}$: $$= \\frac{k+1}{6}\\left[k(2k+1) + 6(k+1)\\right] = \\frac{k+1}{6}(2k^2 + 7k + 6)$$',
          'Factorize $2k^2 + 7k + 6 = (k+2)(2k+3)$: $$= \\frac{(k+1)(k+2)(2k+3)}{6} = \\frac{(k+1)\\big((k+1)+1\\big)\\big(2(k+1)+1\\big)}{6}$$ This matches the RHS for $n = k+1$.',
        ],
        finalAnswer: 'By PMI, the summation formula holds for all $n \\in \\mathbb{N}$.',
      },
      {
        id: 'ex-3.2',
        label: 'Worked Example 3.2',
        title: 'Divisibility Proof',
        problem: 'Prove that $7^n - 1$ is divisible by $6$ for all $n \\in \\mathbb{N}$.',
        steps: [
          '**Base Case ($n = 1$):** $7^1 - 1 = 6$, which is divisible by $6$.',
          '**Inductive Hypothesis:** Assume $7^k - 1 = 6m$ for some $m \\in \\mathbb{Z}$ (so $7^k = 6m + 1$).',
          '**Inductive Step ($n = k+1$):** $$7^{k+1} - 1 = 7(7^k) - 1 = 7(6m + 1) - 1 = 42m + 7 - 1 = 42m + 6 = 6(7m + 1)$$',
          'Since $7m + 1 \\in \\mathbb{Z}$, $7^{k+1} - 1$ is divisible by $6$.',
        ],
        finalAnswer: 'By PMI, $7^n - 1$ is divisible by $6$ for all $n \\in \\mathbb{N}$.',
      },
    ],
    quickCheck: [
      {
        id: 'qc-3-1',
        prompt: 'In the inductive step of proving $P(n)$ for all $n \\ge 1$, what is directly assumed?',
        options: [
          'That $P(n)$ holds for all $n$',
          'That $P(k)$ holds for some arbitrary $k \\ge 1$',
          'That $P(k+1)$ holds before $P(k)$',
          'That $P(0)$ is false',
        ],
        correctIndex: 1,
        explanation: 'The Inductive Hypothesis assumes $P(k)$ holds for an arbitrary $k \\ge n_0$, then deduces $P(k+1)$.',
      },
    ],
  },
  {
    id: 4,
    code: 'Module 4',
    title: 'Real Sequences and Series',
    shortTitle: 'Sequences & Series',
    weeks: 'Weeks 5–6',
    hours: 4,
    summary:
      'Ordered real sequences, partial sums, Arithmetic Progressions (AP), Geometric Progressions (GP), arithmetic and geometric means, and convergence of infinite geometric series ($|r| < 1$).',
    labTitle: 'AP / GP Sequence & Convergence Lab',
    labDescription:
      'Plot individual terms $T_n$ and partial sums $S_n$ for any Arithmetic or Geometric Progression, and observe convergence to $S_\\infty$ whenever $|r| < 1$.',
    sections: [
      {
        id: '4.1',
        title: '4.1 Definitions',
        items: [
          {
            term: 'Sequence',
            content: 'An ordered list of real numbers $T_1, T_2, T_3, \\dots, T_n, \\dots$, often denoted $\\{a_n\\}$.',
          },
          {
            term: 'Series',
            content: 'The sum of the terms of a sequence: $S_n = \\sum_{r=1}^{n} T_r = T_1 + T_2 + \\dots + T_n$.',
          },
        ],
      },
      {
        id: '4.2',
        title: '4.2 Arithmetic Progression (AP)',
        intro:
          'A sequence in which each term after the first is obtained by adding a constant common difference $d$:',
        items: [
          {
            term: '$n$th Term',
            content: 'With first term $a = T_1$ and common difference $d$:',
            formula: 'T_n = a + (n - 1)d',
          },
          {
            term: 'Sum of First $n$ Terms',
            content: 'Where $l = T_n$ is the last term:',
            formula: 'S_n = \\frac{n}{2}\\left[2a + (n-1)d\\right] = \\frac{n}{2}(a + l)',
          },
          {
            term: 'Arithmetic Mean (AM)',
            content: 'If $a, A, b$ are in AP, then $A = \\frac{a+b}{2}$.',
          },
        ],
      },
      {
        id: '4.3',
        title: '4.3 Geometric Progression (GP)',
        intro:
          'A sequence in which each term after the first is obtained by multiplying the previous term by a constant common ratio $r \\neq 0$:',
        items: [
          {
            term: '$n$th Term',
            content: 'With first term $a$ and common ratio $r$:',
            formula: 'T_n = ar^{n-1}',
          },
          {
            term: 'Sum of First $n$ Terms ($r \\neq 1$)',
            content: 'Closed form for finite geometric partial sum:',
            formula:
              'S_n = \\frac{a(1 - r^n)}{1 - r} \\text{ for } |r| < 1 \\quad \\text{or} \\quad S_n = \\frac{a(r^n - 1)}{r - 1} \\text{ for } |r| > 1',
          },
          {
            term: 'Sum to Infinity ($S_\\infty$)',
            content: 'If $|r| < 1$, then $r^n \\to 0$ as $n \\to \\infty$, so the series converges to:',
            formula: 'S_\\infty = \\frac{a}{1 - r}',
          },
          {
            term: 'Geometric Mean (GM)',
            content: 'If $a, G, b$ are positive terms in GP, then $G = \\sqrt{ab}$.',
          },
        ],
      },
    ],
    workedExamples: [
      {
        id: 'ex-4.1',
        label: 'Worked Example 4.1',
        title: 'Solving AP Parameters and Partial Sum',
        problem:
          'In an AP, the $3$rd term is $11$ and the $8$th term is $26$. Find the first term, the common difference, and the sum of the first $10$ terms.',
        steps: [
          'Write $T_3$ and $T_8$ in terms of $a$ and $d$: $T_3 = a + 2d = 11$ and $T_8 = a + 7d = 26$.',
          'Subtract the first equation from the second: $5d = 15 \\implies d = 3$.',
          'Substitute $d = 3$ into $a + 2d = 11$: $a + 2(3) = 11 \\implies a = 5$.',
          'Compute $S_{10}$: $$S_{10} = \\frac{10}{2}\\left[2(5) + (10-1)(3)\\right] = 5(10 + 27) = 185$$',
        ],
        finalAnswer: '$a = 5$, $d = 3$, and $S_{10} = 185$.',
      },
      {
        id: 'ex-4.2',
        label: 'Worked Example 4.2',
        title: 'Sum to Infinity of a Convergent GP',
        problem: 'Find the sum to infinity of the GP $12, 4, \\frac{4}{3}, \\frac{4}{9}, \\dots$',
        steps: [
          'Identify the first term $a = 12$ and common ratio $r = \\frac{4}{12} = \\frac{1}{3}$.',
          'Verify the convergence condition: $|r| = \\frac{1}{3} < 1$, so the series converges.',
          'Apply $S_\\infty = \\frac{a}{1-r}$: $$S_\\infty = \\frac{12}{1 - \\frac{1}{3}} = \\frac{12}{\\frac{2}{3}} = 18$$',
        ],
        finalAnswer: '$S_\\infty = 18$',
      },
    ],
    quickCheck: [
      {
        id: 'qc-4-1',
        prompt: 'For which values of the common ratio $r$ does an infinite geometric series converge?',
        options: ['$r > 1$', '$|r| < 1$', '$r = 1$', '$|r| > 1$'],
        correctIndex: 1,
        explanation: 'As $n \\to \\infty$, $r^n \\to 0$ if and only if $|r| < 1$.',
      },
      {
        id: 'qc-4-2',
        prompt: 'What is the geometric mean of $4$ and $9$?',
        options: ['$6.5$', '$6$', '$13$', '$36$'],
        correctIndex: 1,
        explanation: 'The geometric mean of positive numbers $a$ and $b$ is $G = \\sqrt{ab} = \\sqrt{36} = 6$.',
      },
    ],
  },
  {
    id: 5,
    code: 'Module 5',
    title: 'Theory of Quadratic Equations',
    shortTitle: 'Quadratic Equations',
    weeks: 'Weeks 7–8',
    hours: 4,
    summary:
      'Solution methods (factorisation, completing the square, quadratic formula), discriminant analysis ($\\Delta = b^2 - 4ac$), Vieta’s sum and product of roots, and symmetric functions of roots.',
    labTitle: 'Parabola, Discriminant & Roots Lab',
    labDescription:
      'Manipulate $a, b, c$ in $ax^2 + bx + c = 0$ to inspect real or complex roots, discriminant classification, and symmetric root identities like $\\alpha^2 + \\beta^2$.',
    sections: [
      {
        id: '5.1',
        title: '5.1 Standard Form and Solution Methods',
        intro: 'A quadratic equation in $x$ has the form $ax^2 + bx + c = 0$, $a \\neq 0$. Methods of solving include Factorisation, Completing the Square, and the Quadratic Formula:',
        items: [
          {
            term: 'Quadratic Formula',
            content: 'Derived by completing the square:',
            formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
          },
        ],
      },
      {
        id: '5.2',
        title: '5.2 The Discriminant and Nature of Roots',
        intro: 'The expression $\\Delta = b^2 - 4ac$ is called the discriminant:',
        items: [
          {
            term: '$\\Delta > 0$',
            content: 'Two distinct real roots. (If $\\Delta$ is a perfect square and $a,b,c \\in \\mathbb{Q}$, roots are rational).',
          },
          {
            term: '$\\Delta = 0$',
            content: 'Two equal (coincident) real roots ($x = -\\frac{b}{2a}$).',
          },
          {
            term: '$\\Delta < 0$',
            content: 'Two distinct complex conjugate roots (no real roots).',
          },
        ],
      },
      {
        id: '5.3',
        title: '5.3 Sum and Product of Roots',
        items: [
          {
            term: 'Relations Between Roots and Coefficients',
            content: 'If $\\alpha$ and $\\beta$ are the roots of $ax^2 + bx + c = 0$:',
            formula: '\\alpha + \\beta = -\\frac{b}{a}, \\qquad \\alpha\\beta = \\frac{c}{a}',
          },
          {
            term: 'Constructing a Quadratic from Roots',
            content: 'Conversely, a quadratic equation with roots $\\alpha$ and $\\beta$ is given by:',
            formula:
              'x^2 - (\\text{sum of roots})x + (\\text{product of roots}) = 0 \\implies x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0',
          },
        ],
      },
      {
        id: '5.4',
        title: '5.4 Symmetric Functions of Roots',
        items: [
          {
            term: 'Sum of Squares',
            content: '$\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta$',
          },
          {
            term: 'Squared Difference',
            content: '$(\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4\\alpha\\beta$',
          },
          {
            term: 'Sum of Cubes',
            content: '$\\alpha^3 + \\beta^3 = (\\alpha + \\beta)^3 - 3\\alpha\\beta(\\alpha + \\beta)$',
          },
          {
            term: 'Sum of Reciprocals',
            content: '$\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta}$',
          },
        ],
      },
    ],
    workedExamples: [
      {
        id: 'ex-5.1',
        label: 'Worked Example 5.1',
        title: 'Symmetric Functions & Forming a New Equation',
        problem:
          'If $\\alpha$ and $\\beta$ are the roots of $2x^2 - 5x + 4 = 0$, find: (a) $\\alpha^2 + \\beta^2$ and (b) a quadratic equation whose roots are $\\frac{1}{\\alpha}$ and $\\frac{1}{\\beta}$.',
        steps: [
          'Read coefficients $a = 2, b = -5, c = 4$. Thus $\\alpha + \\beta = -\\frac{-5}{2} = \\frac{5}{2}$ and $\\alpha\\beta = \\frac{4}{2} = 2$.',
          '(a) Use $\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = \\left(\\frac{5}{2}\\right)^2 - 2(2) = \\frac{25}{4} - 4 = \\frac{9}{4}$.',
          '(b) Find the sum of the new roots: $\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta} = \\frac{5/2}{2} = \\frac{5}{4}$.',
          'Find the product of the new roots: $\\frac{1}{\\alpha} \\cdot \\frac{1}{\\beta} = \\frac{1}{\\alpha\\beta} = \\frac{1}{2}$.',
          'Form the equation $x^2 - \\frac{5}{4}x + \\frac{1}{2} = 0$ and multiply through by $4$: $4x^2 - 5x + 2 = 0$.',
        ],
        finalAnswer: '(a) $\\frac{9}{4}$  |  (b) $4x^2 - 5x + 2 = 0$',
      },
    ],
    quickCheck: [
      {
        id: 'qc-5-1',
        prompt: 'If $\\alpha$ and $\\beta$ are roots of $3x^2 + 6x - 9 = 0$, what is $\\alpha + \\beta$?',
        options: ['$2$', '$-2$', '$-3$', '$3$'],
        correctIndex: 1,
        explanation: '$\\alpha + \\beta = -\\frac{b}{a} = -\\frac{6}{3} = -2$.',
      },
      {
        id: 'qc-5-2',
        prompt: 'When $b^2 - 4ac < 0$ (for real coefficients), the quadratic equation has:',
        options: [
          'Two equal real roots',
          'Two rational roots',
          'Two distinct complex conjugate roots',
          'Only one root at $0$',
        ],
        correctIndex: 2,
        explanation: 'A negative discriminant yields $\\sqrt{\\Delta} = i\\sqrt{|\\Delta|}$, giving complex conjugate roots.',
      },
    ],
  },
  {
    id: 6,
    code: 'Module 6',
    title: 'Binomial Theorem',
    shortTitle: 'Binomial Theorem',
    weeks: 'Weeks 9–10',
    hours: 4,
    summary:
      'Binomial expansion for positive integral index, Pascal’s triangle, extracting specific $(r+1)$th terms, and infinite series expansion for negative or rational indices valid on $|x| < 1$.',
    labTitle: "Pascal's Triangle & Term Extractor Lab",
    labDescription:
      'Explore Pascal’s Triangle coefficients, isolate specific powers of $x$ in $(ax^p + bx^q)^n$, or compare rational-index Taylor approximations against exact curves on $|x|<1$.',
    sections: [
      {
        id: '6.1',
        title: '6.1 Binomial Theorem for Positive Integral Index',
        intro: 'For any $n \\in \\mathbb{N}$:',
        items: [
          {
            term: 'Binomial Expansion',
            content: 'Where $\\binom{n}{r} = {}^nC_r = \\frac{n!}{r!(n-r)!}$ and $0! = 1$:',
            formula:
              '(a + b)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^r = \\binom{n}{0}a^n + \\binom{n}{1}a^{n-1}b + \\dots + \\binom{n}{n}b^n',
          },
          {
            term: 'General Term ($(r+1)$th term)',
            content: 'Gives any term directly without expanding the full power:',
            formula: 'T_{r+1} = \\binom{n}{r} a^{n-r} b^r',
          },
          {
            term: 'Total Number of Terms',
            content: 'There are $n + 1$ terms in $(a+b)^n$.',
          },
          {
            term: "Pascal's Triangle",
            content: 'Generates coefficients for small $n$ (e.g., $n = 4 \\implies 1, 4, 6, 4, 1$).',
          },
        ],
      },
      {
        id: '6.2',
        title: '6.2 Binomial Theorem for Rational / Negative Indices',
        intro:
          'When $n$ is a negative integer or a fraction ($n \\in \\mathbb{Q}$), the expansion of $(1 + x)^n$ is an infinite series valid only when $|x| < 1$:',
        items: [
          {
            term: 'Infinite Binomial Series',
            content: 'Valid strictly for $|x| < 1$:',
            formula:
              '(1 + x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\frac{n(n-1)(n-2)}{3!}x^3 + \\dots',
          },
          {
            term: 'General Form $(a + x)^n$',
            content:
              'Factor out $a^n$: $(a + x)^n = a^n\\left(1 + \\frac{x}{a}\\right)^n$, valid for $\\left|\\frac{x}{a}\\right| < 1$.',
          },
        ],
      },
    ],
    workedExamples: [
      {
        id: 'ex-6.1',
        label: 'Worked Example 6.1',
        title: 'Finding a Specific Coefficient',
        problem: 'Find the coefficient of $x^3$ in the expansion of $\\left(2x - \\frac{1}{x^2}\\right)^9$.',
        steps: [
          'Write the general $(r+1)$th term: $$T_{r+1} = \\binom{9}{r}(2x)^{9-r}\\left(-x^{-2}\\right)^r = \\binom{9}{r} 2^{9-r} (-1)^r x^{9 - r - 2r} = \\binom{9}{r} 2^{9-r} (-1)^r x^{9-3r}$$',
          'Set the exponent of $x$ equal to $3$: $9 - 3r = 3 \\implies 3r = 6 \\implies r = 2$.',
          'Evaluate the coefficient for $r = 2$: $\\binom{9}{2} 2^{9-2} (-1)^2 = \\frac{9 \\times 8}{2} \\times 128 \\times 1 = 36 \\times 128 = 4608$.',
        ],
        finalAnswer: 'The coefficient of $x^3$ is $4608$.',
      },
      {
        id: 'ex-6.2',
        label: 'Worked Example 6.2',
        title: 'Negative Index Expansion',
        problem: 'Expand $(1 + x)^{-2}$ up to the term in $x^3$, stating the condition for validity.',
        steps: [
          'Substitute $n = -2$ into the infinite binomial series: $$(1 + x)^{-2} = 1 + (-2)x + \\frac{(-2)(-3)}{2!}x^2 + \\frac{(-2)(-3)(-4)}{3!}x^3 + \\dots$$',
          'Simplify coefficients: $\\frac{6}{2} = 3$, and $\\frac{-24}{6} = -4$.',
          'Write the expansion and validity condition: $1 - 2x + 3x^2 - 4x^3 + \\dots$, valid for $|x| < 1$.',
        ],
        finalAnswer: '$1 - 2x + 3x^2 - 4x^3 + \\dots$ (valid for $|x| < 1$).',
      },
      {
        id: 'ex-6.3',
        label: 'Worked Example 6.3',
        title: 'Numerical Approximation',
        problem: 'Using the first three terms of the binomial expansion of $(1 + x)^{1/2}$, estimate $\\sqrt{1.04}$.',
        steps: [
          'Write $\\sqrt{1.04} = (1 + 0.04)^{1/2}$ so $x = 0.04$ (which satisfies $|0.04| < 1$) and $n = \\frac{1}{2}$.',
          'Expand first three terms: $$(1 + 0.04)^{1/2} \\approx 1 + \\frac{1}{2}(0.04) + \\frac{\\frac{1}{2}\\left(-\\frac{1}{2}\\right)}{2}(0.04)^2$$',
          'Compute arithmetic: $1 + 0.02 - \\frac{1}{8}(0.0016) = 1.02 - 0.0002 = 1.0198$.',
        ],
        finalAnswer: '$\\sqrt{1.04} \\approx 1.0198$',
      },
    ],
    quickCheck: [
      {
        id: 'qc-6-1',
        prompt: 'How many terms are in the expansion of $(3x - 2y)^7$?',
        options: ['$6$', '$7$', '$8$', '$9$'],
        correctIndex: 2,
        explanation: 'A binomial raised to positive integer $n$ has $n + 1$ terms, so $7 + 1 = 8$ terms.',
      },
      {
        id: 'qc-6-2',
        prompt: 'For what values of $x$ is the infinite expansion of $(1 + 2x)^{-1}$ valid?',
        options: ['$|x| < 1$', '$|x| < \\frac{1}{2}$', '$|x| < 2$', 'All real $x$'],
        correctIndex: 1,
        explanation: 'Convergence requires $|2x| < 1$, which gives $|x| < \\frac{1}{2}$.',
      },
    ],
  },
  {
    id: 7,
    code: 'Module 7',
    title: 'Complex Numbers and the Argand Diagram',
    shortTitle: 'Complex Numbers',
    weeks: 'Weeks 11–12',
    hours: 4,
    summary:
      'Cartesian form $z = x + iy$, complex arithmetic and conjugate division, geometric representation on the Argand plane, modulus $|z|$, principal argument $\\text{Arg}(z) \\in (-\\pi, \\pi]$, and polar form.',
    labTitle: 'Argand Plane & Polar Vector Lab',
    labDescription:
      'Drag or edit $z_1$ and $z_2$ on the Argand diagram to visualize addition, multiplication, conjugate reflection, division, modulus, and principal argument.',
    sections: [
      {
        id: '7.1',
        title: '7.1 Definition and Algebra of Complex Numbers',
        intro:
          'The imaginary unit $i$ is defined by $i^2 = -1$ ($i = \\sqrt{-1}$). A complex number $z \\in \\mathbb{C}$ in Cartesian form is $z = x + iy$, where $x = \\text{Re}(z)$ and $y = \\text{Im}(z)$ are real.',
        items: [
          {
            term: 'Equality',
            content: '$a + bi = c + di \\iff a = c \\text{ and } b = d$.',
          },
          {
            term: 'Addition / Subtraction',
            content: '$(a + bi) \\pm (c + di) = (a \\pm c) + (b \\pm d)i$.',
          },
          {
            term: 'Multiplication',
            content: '$(a + bi)(c + di) = (ac - bd) + (ad + bc)i$.',
          },
          {
            term: 'Complex Conjugate ($\\bar{z}$ or $z^*$)',
            content: 'If $z = x + iy$, then $\\bar{z} = x - iy$. Note that $z\\bar{z} = x^2 + y^2$.',
          },
          {
            term: 'Division',
            content: 'Multiply numerator and denominator by the conjugate of the denominator:',
            formula: '\\frac{z_1}{z_2} = \\frac{z_1 \\bar{z}_2}{z_2 \\bar{z}_2}',
          },
        ],
      },
      {
        id: '7.2',
        title: '7.2 The Argand Diagram, Modulus, and Argument',
        intro:
          'A complex number $z = x + iy$ is represented as a point $(x, y)$ or position vector in the Argand plane (horizontal real axis, vertical imaginary axis).',
        items: [
          {
            term: 'Modulus ($r$ or $|z|$)',
            content: 'Distance from the origin: $r = |z| = \\sqrt{x^2 + y^2}$.',
          },
          {
            term: 'Argument ($\\theta$ or $\\arg(z)$)',
            content:
              'Angle measured counter-clockwise from the positive real axis to $z$, satisfying $\\tan\\theta = \\frac{y}{x}$ (adjusted for the quadrant of $(x, y)$).',
          },
          {
            term: 'Principal Argument ($\\text{Arg}(z)$)',
            content: 'The unique value of $\\theta$ in $(-\\pi, \\pi]$.',
          },
          {
            term: 'Polar (Trigonometric) Form',
            content: 'Since $x = r\\cos\\theta$ and $y = r\\sin\\theta$:',
            formula: 'z = r(\\cos\\theta + i\\sin\\theta) = r\\,\\text{cis}\\,\\theta',
          },
        ],
      },
    ],
    workedExamples: [
      {
        id: 'ex-7.1',
        label: 'Worked Example 7.1',
        title: 'Complex Division',
        problem: 'Simplify $\\frac{3 + 2i}{1 - i}$ in the form $x + iy$.',
        steps: [
          'Multiply numerator and denominator by the conjugate of $1 - i$, which is $1 + i$: $$\\frac{3 + 2i}{1 - i} \\cdot \\frac{1 + i}{1 + i}$$',
          'Expand numerator and denominator: $$= \\frac{3 + 3i + 2i + 2i^2}{1^2 - i^2} = \\frac{3 + 5i - 2}{1 + 1}$$',
          'Combine real and imaginary parts: $$= \\frac{1 + 5i}{2} = \\frac{1}{2} + \\frac{5}{2}i$$',
        ],
        finalAnswer: '$\\frac{1}{2} + \\frac{5}{2}i$',
      },
      {
        id: 'ex-7.2',
        label: 'Worked Example 7.2',
        title: 'Converting to Polar Form',
        problem: 'Express $z = -1 + \\sqrt{3}i$ in polar form.',
        steps: [
          'Identify coordinates: $x = -1$ and $y = \\sqrt{3}$, which lies in Quadrant II.',
          'Compute modulus: $r = \\sqrt{(-1)^2 + (\\sqrt{3})^2} = \\sqrt{1 + 3} = 2$.',
          'Find reference angle $\\alpha = \\arctan\\left(\\frac{\\sqrt{3}}{1}\\right) = \\frac{\\pi}{3}$. Since $z$ is in Quadrant II, $\\theta = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3}$.',
          'Write polar form: $z = 2\\left(\\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3}\\right)$.',
        ],
        finalAnswer: '$z = 2\\left(\\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3}\\right)$',
      },
    ],
    quickCheck: [
      {
        id: 'qc-7-1',
        prompt: 'What is the modulus $|3 - 4i|$?',
        options: ['$1$', '$5$', '$7$', '$25$'],
        correctIndex: 1,
        explanation: '$|3 - 4i| = \\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.',
      },
      {
        id: 'qc-7-2',
        prompt: 'In which quadrant does $z = -2 - 2i$ lie, and what is its principal argument?',
        options: [
          'Quadrant III, $\\text{Arg}(z) = -\\frac{3\\pi}{4}$',
          'Quadrant II, $\\text{Arg}(z) = \\frac{3\\pi}{4}$',
          'Quadrant III, $\\text{Arg}(z) = \\frac{5\\pi}{4}$',
          'Quadrant IV, $\\text{Arg}(z) = -\\frac{\\pi}{4}$',
        ],
        correctIndex: 0,
        explanation: 'Both $x < 0$ and $y < 0$ puts $z$ in Quadrant III; within $(-\\pi, \\pi]$, $\\text{Arg}(z) = -\\frac{3\\pi}{4}$.',
      },
    ],
  },
  {
    id: 8,
    code: 'Module 8',
    title: "De Moivre’s Theorem and nth Roots of Unity",
    shortTitle: "De Moivre's Theorem",
    weeks: 'Week 13',
    hours: 2,
    summary:
      'De Moivre’s theorem $(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)$, evaluating complex powers, deriving multiple-angle identities, and computing $n$th roots as regular $n$-gon vertices.',
    labTitle: 'De Moivre Powers & Roots Polygon Lab',
    labDescription:
      'Raise complex numbers to power $n$ via angle scaling, or compute all $n$ distinct roots of $z^n = w$ and observe their regular $n$-gon geometry with $\\sum z_k = 0$.',
    sections: [
      {
        id: '8.1',
        title: '8.1 De Moivre’s Theorem',
        items: [
          {
            term: 'Theorem Statement',
            content: 'For any real number $n$ and angle $\\theta$:',
            formula: '(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)',
          },
          {
            term: 'General Polar Power',
            content: 'If $z = r(\\cos\\theta + i\\sin\\theta)$, then:',
            formula: 'z^n = r^n(\\cos(n\\theta) + i\\sin(n\\theta))',
          },
        ],
      },
      {
        id: '8.2',
        title: '8.2 $n$th Roots of a Complex Number and $n$th Roots of Unity',
        items: [
          {
            term: '$n$th Roots of $w = r(\\cos\\theta + i\\sin\\theta)$',
            content: 'Writing $w = r(\\cos(\\theta + 2k\\pi) + i\\sin(\\theta + 2k\\pi))$ yields $n$ distinct roots:',
            formula:
              'z_k = r^{1/n}\\left[\\cos\\left(\\frac{\\theta + 2k\\pi}{n}\\right) + i\\sin\\left(\\frac{\\theta + 2k\\pi}{n}\\right)\\right], \\quad k = 0, 1, 2, \\dots, n-1',
          },
          {
            term: '$n$th Roots of Unity ($z^n = 1$)',
            content:
              'Setting $r = 1$ and $\\theta = 0$, the roots lie evenly spaced on the unit circle $|z| = 1$, forming the vertices of a regular $n$-gon. The sum of all $n$th roots of unity is always $0$.',
            formula:
              'z_k = \\cos\\left(\\frac{2k\\pi}{n}\\right) + i\\sin\\left(\\frac{2k\\pi}{n}\\right), \\quad k = 0, 1, \\dots, n-1',
          },
        ],
      },
    ],
    workedExamples: [
      {
        id: 'ex-8.1',
        label: 'Worked Example 8.1',
        title: 'Evaluating High Powers',
        problem: 'Use De Moivre’s theorem to evaluate $(-1 + \\sqrt{3}i)^6$.',
        steps: [
          'From Worked Example 7.2, $-1 + \\sqrt{3}i = 2\\left(\\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3}\\right)$.',
          'Apply De Moivre’s theorem with $n = 6$: $$(-1 + \\sqrt{3}i)^6 = 2^6\\left[\\cos\\left(6 \\cdot \\frac{2\\pi}{3}\\right) + i\\sin\\left(6 \\cdot \\frac{2\\pi}{3}\\right)\\right]$$',
          'Simplify: $64(\\cos 4\\pi + i\\sin 4\\pi) = 64(1 + 0i) = 64$.',
        ],
        finalAnswer: '$64$',
      },
      {
        id: 'ex-8.2',
        label: 'Worked Example 8.2',
        title: 'Triple-Angle Trigonometric Identities',
        problem: 'Express $\\cos 3\\theta$ and $\\sin 3\\theta$ in terms of $\\cos\\theta$ and $\\sin\\theta$.',
        steps: [
          'Expand $(\\cos\\theta + i\\sin\\theta)^3$ by the binomial theorem and equate to $\\cos 3\\theta + i\\sin 3\\theta$: $$\\cos 3\\theta + i\\sin 3\\theta = \\cos^3\\theta + 3i\\cos^2\\theta\\sin\\theta - 3\\cos\\theta\\sin^2\\theta - i\\sin^3\\theta$$',
          'Equate real parts: $\\cos 3\\theta = \\cos^3\\theta - 3\\cos\\theta\\sin^2\\theta = 4\\cos^3\\theta - 3\\cos\\theta$.',
          'Equate imaginary parts: $\\sin 3\\theta = 3\\cos^2\\theta\\sin\\theta - \\sin^3\\theta = 3\\sin\\theta - 4\\sin^3\\theta$.',
        ],
        finalAnswer: '$\\cos 3\\theta = 4\\cos^3\\theta - 3\\cos\\theta$, $\\quad \\sin 3\\theta = 3\\sin\\theta - 4\\sin^3\\theta$',
      },
      {
        id: 'ex-8.3',
        label: 'Worked Example 8.3',
        title: 'Cube Roots of Unity',
        problem: 'Find the cube roots of unity ($z^3 = 1$).',
        steps: [
          'Use the roots of unity formula with $n = 3$: $z_k = \\cos\\left(\\frac{2k\\pi}{3}\\right) + i\\sin\\left(\\frac{2k\\pi}{3}\\right)$ for $k = 0, 1, 2$.',
          'For $k = 0$: $z_0 = \\cos 0 + i\\sin 0 = 1$.',
          'For $k = 1$: $z_1 = \\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3} = -\\frac{1}{2} + \\frac{\\sqrt{3}}{2}i = \\omega$.',
          'For $k = 2$: $z_2 = \\cos\\frac{4\\pi}{3} + i\\sin\\frac{4\\pi}{3} = -\\frac{1}{2} - \\frac{\\sqrt{3}}{2}i = \\omega^2$. Notice $1 + \\omega + \\omega^2 = 0$.',
        ],
        finalAnswer: '$1, \\; -\\frac{1}{2} + \\frac{\\sqrt{3}}{2}i, \\; -\\frac{1}{2} - \\frac{\\sqrt{3}}{2}i$',
      },
    ],
    quickCheck: [
      {
        id: 'qc-8-1',
        prompt: 'If $\\omega$ is a non-real cube root of unity, what is $1 + \\omega + \\omega^2$?',
        options: ['$1$', '$0$', '$-1$', '$3$'],
        correctIndex: 1,
        explanation: 'The sum of all $n$th roots of unity is always $0$, so $1 + \\omega + \\omega^2 = 0$.',
      },
    ],
  },
  {
    id: 9,
    code: 'Module 9',
    title: 'Circular Measure and Trigonometry',
    shortTitle: 'Trigonometry',
    weeks: 'Weeks 14–15',
    hours: 4,
    summary:
      'Radian measure, arc length and sector area, general angles and CAST quadrant rule, Pythagorean identities, addition and double-angle formulae, and sum/product factor formulae.',
    labTitle: 'Unit Circle, Radian Sector & CAST Lab',
    labDescription:
      'Sweep angle $\\theta$ around the circle to inspect radian arc length $s = r\\theta$, sector area, CAST quadrant signs, and test addition or factor identities live.',
    sections: [
      {
        id: '9.1',
        title: '9.1 Circular Measure (Radians)',
        items: [
          {
            term: 'Radian',
            content: 'The angle subtended at the centre of a circle by an arc equal in length to the radius.',
          },
          {
            term: 'Conversion',
            content:
              '$\\pi \\text{ radians} = 180^\\circ \\implies 1\\text{ rad} = \\frac{180^\\circ}{\\pi}$, $\\quad 1^\\circ = \\frac{\\pi}{180}\\text{ rad}$.',
          },
          {
            term: 'Arc Length & Sector Area',
            content: 'For radius $r$ and central angle $\\theta$ (in radians):',
            formula: 's = r\\theta, \\qquad A = \\frac{1}{2}r^2\\theta',
          },
        ],
      },
      {
        id: '9.2',
        title: '9.2 Trigonometric Functions of Angles of Any Magnitude',
        items: [
          {
            term: 'Standard Position Ratios',
            content: 'For terminal ray passing through $P(x, y)$ at distance $r = \\sqrt{x^2 + y^2} > 0$:',
            formula:
              '\\sin\\theta = \\frac{y}{r}, \\quad \\cos\\theta = \\frac{x}{r}, \\quad \\tan\\theta = \\frac{y}{x} \\ (x \\neq 0)',
          },
          {
            term: 'Reciprocal Ratios',
            content: '$\\csc\\theta = \\frac{1}{\\sin\\theta}, \\quad \\sec\\theta = \\frac{1}{\\cos\\theta}, \\quad \\cot\\theta = \\frac{1}{\\tan\\theta}$.',
          },
          {
            term: 'CAST Quadrant Sign Rule',
            content:
              'Quadrant I ($0^\\circ < \\theta < 90^\\circ$): **A**ll positive. Quadrant II ($90^\\circ < \\theta < 180^\\circ$): **S**ine (and $\\csc$) positive. Quadrant III ($180^\\circ < \\theta < 270^\\circ$): **T**angent (and $\\cot$) positive. Quadrant IV ($270^\\circ < \\theta < 360^\\circ$): **C**osine (and $\\sec$) positive.',
          },
          {
            term: 'Pythagorean Identities',
            content: '$\\sin^2\\theta + \\cos^2\\theta = 1$, $\\quad 1 + \\tan^2\\theta = \\sec^2\\theta$, $\\quad 1 + \\cot^2\\theta = \\csc^2\\theta$.',
          },
        ],
      },
      {
        id: '9.3',
        title: '9.3 Addition and Double-Angle Formulae',
        items: [
          {
            term: 'Addition Formulae',
            content: 'Compound angle expansions:',
            formula:
              '\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B \\qquad \\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B',
          },
          {
            term: 'Tangent Addition',
            content: 'Ratio expansion:',
            formula: '\\tan(A \\pm B) = \\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A \\tan B}',
          },
          {
            term: 'Double-Angle Formulae ($B = A$)',
            content: 'Derived directly from addition formulae:',
            formula:
              '\\sin 2A = 2\\sin A\\cos A, \\qquad \\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A, \\qquad \\tan 2A = \\frac{2\\tan A}{1 - \\tan^2 A}',
          },
        ],
      },
      {
        id: '9.4',
        title: '9.4 Factor Formulae (Sum-to-Product & Product-to-Sum)',
        items: [
          {
            term: 'Sum-to-Product',
            content: 'Factor sums and differences of sines and cosines:',
            formula:
              '\\begin{aligned} \\sin P + \\sin Q &= 2\\sin\\left(\\frac{P+Q}{2}\\right)\\cos\\left(\\frac{P-Q}{2}\\right) \\\\ \\sin P - \\sin Q &= 2\\cos\\left(\\frac{P+Q}{2}\\right)\\sin\\left(\\frac{P-Q}{2}\\right) \\\\ \\cos P + \\cos Q &= 2\\cos\\left(\\frac{P+Q}{2}\\right)\\cos\\left(\\frac{P-Q}{2}\\right) \\\\ \\cos P - \\cos Q &= -2\\sin\\left(\\frac{P+Q}{2}\\right)\\sin\\left(\\frac{P-Q}{2}\\right) \\end{aligned}',
          },
          {
            term: 'Product-to-Sum',
            content: 'Expand products into sums:',
            formula:
              '2\\sin A\\cos B = \\sin(A+B) + \\sin(A-B), \\quad 2\\cos A\\cos B = \\cos(A+B) + \\cos(A-B), \\quad 2\\sin A\\sin B = \\cos(A-B) - \\cos(A+B)',
          },
        ],
      },
    ],
    workedExamples: [
      {
        id: 'ex-9.1',
        label: 'Worked Example 9.1',
        title: 'Exact Value via Addition Formula',
        problem: 'Find the exact value of $\\cos 75^\\circ$.',
        steps: [
          'Split $75^\\circ = 45^\\circ + 30^\\circ$ and apply $\\cos(A+B) = \\cos A\\cos B - \\sin A\\sin B$: $$\\cos 75^\\circ = \\cos(45^\\circ + 30^\\circ) = \\cos 45^\\circ \\cos 30^\\circ - \\sin 45^\\circ \\sin 30^\\circ$$',
          'Substitute exact standard values: $$= \\left(\\frac{\\sqrt{2}}{2}\\right)\\left(\\frac{\\sqrt{3}}{2}\\right) - \\left(\\frac{\\sqrt{2}}{2}\\right)\\left(\\frac{1}{2}\\right) = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$$',
        ],
        finalAnswer: '$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$',
      },
      {
        id: 'ex-9.2',
        label: 'Worked Example 9.2',
        title: 'Solving Trigonometric Equations via Factor Formula',
        problem: 'Solve $\\cos 3\\theta + \\cos\\theta = 0$ for $0 \\le \\theta \\le 2\\pi$.',
        steps: [
          'Apply $\\cos P + \\cos Q = 2\\cos\\left(\\frac{P+Q}{2}\\right)\\cos\\left(\\frac{P-Q}{2}\\right)$: $$2\\cos\\left(\\frac{3\\theta + \\theta}{2}\\right)\\cos\\left(\\frac{3\\theta - \\theta}{2}\\right) = 0 \\implies 2\\cos 2\\theta \\cos\\theta = 0$$',
          'Set each factor to zero: either $\\cos\\theta = 0$ or $\\cos 2\\theta = 0$.',
          'From $\\cos\\theta = 0$ on $[0, 2\\pi]$: $\\theta = \\frac{\\pi}{2}, \\frac{3\\pi}{2}$.',
          'From $\\cos 2\\theta = 0$ (where $0 \\le 2\\theta \\le 4\\pi$): $2\\theta = \\frac{\\pi}{2}, \\frac{3\\pi}{2}, \\frac{5\\pi}{2}, \\frac{7\\pi}{2} \\implies \\theta = \\frac{\\pi}{4}, \\frac{3\\pi}{4}, \\frac{5\\pi}{4}, \\frac{7\\pi}{4}$.',
        ],
        finalAnswer: '$\\theta \\in \\left\\{\\frac{\\pi}{4}, \\frac{\\pi}{2}, \\frac{3\\pi}{4}, \\frac{5\\pi}{4}, \\frac{3\\pi}{2}, \\frac{7\\pi}{4}\\right\\}$',
      },
    ],
    quickCheck: [
      {
        id: 'qc-9-1',
        prompt: 'What is the area of a sector of radius $4\\text{ cm}$ and central angle $0.5\\text{ rad}$?',
        options: ['$2\\text{ cm}^2$', '$4\\text{ cm}^2$', '$8\\text{ cm}^2$', '$1\\text{ cm}^2$'],
        correctIndex: 1,
        explanation: 'Area $A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}(4)^2(0.5) = 4\\text{ cm}^2$.',
      },
      {
        id: 'qc-9-2',
        prompt: 'In Quadrant III ($180^\\circ < \\theta < 270^\\circ$), which primary trigonometric function is positive?',
        options: ['$\\sin\\theta$', '$\\cos\\theta$', '$\\tan\\theta$', 'None'],
        correctIndex: 2,
        explanation: 'By the CAST rule, only Tangent (and Cotangent) are positive in Quadrant III.',
      },
    ],
  },
];

export const TUTORIAL_EXERCISES: TutorialProblem[] = [
  {
    id: 1,
    moduleId: 1,
    topic: 'Sets',
    question:
      "Given $U = \\{1, 2, \\dots, 10\\}$, $A = \\{2, 4, 6, 8, 10\\}$, and $B = \\{1, 2, 3, 4, 5\\}$, verify De Morgan’s Law $(A \\cup B)' = A' \\cap B'$.",
    hint: 'First compute $A \\cup B$ and take its complement in $U$. Then compute $A\\prime$ and $B\\prime$ separately and take their intersection.',
    solutionSteps: [
      'Compute the union: $A \\cup B = \\{1, 2, 3, 4, 5, 6, 8, 10\\}$.',
      'Take its complement in $U = \\{1,2,\\dots,10\\}$: $(A \\cup B)\' = \\{7, 9\\}$.',
      'Find individual complements: $A\' = \\{1, 3, 5, 7, 9\\}$ and $B\' = \\{6, 7, 8, 9, 10\\}$.',
      'Take their intersection: $A\' \\cap B\' = \\{7, 9\\}$. Since both sides equal $\\{7, 9\\}$, De Morgan’s Law is verified.',
    ],
    answer: "$(A \\cup B)' = A' \\cap B' = \\{7, 9\\}$",
    checkQuestion: {
      prompt: "Which set equals $(A \\cup B)'$ and $A' \\cap B'$?",
      options: ['$\\{7, 9\\}$', '$\\{2, 4\\}$', '$\\{1, 3, 5\\}$', '$\\{6, 7, 8, 9\\}$'],
      correctIndex: 0,
    },
  },
  {
    id: 2,
    moduleId: 2,
    topic: 'Numbers',
    question: 'Express $1.3\\overline{6}$ as a rational fraction in simplest form.',
    hint: 'Let $x = 1.3666\\dots$. Multiply by $10$ so the repeating block starts right after the decimal point, then multiply by $100$ and subtract.',
    solutionSteps: [
      'Let $x = 1.3666\\dots$',
      'Multiply by $10$: $10x = 13.6666\\dots$',
      'Multiply by $100$: $100x = 136.6666\\dots$',
      'Subtract: $100x - 10x = 136.6666\\dots - 13.6666\\dots \\implies 90x = 123$.',
      'Simplify by dividing numerator and denominator by $3$: $x = \\frac{123}{90} = \\frac{41}{30}$.',
    ],
    answer: '$\\frac{41}{30}$',
    checkQuestion: {
      prompt: 'What is $1.3\\overline{6}$ in simplest fractional form?',
      options: ['$\\frac{41}{30}$', '$\\frac{136}{99}$', '$\\frac{15}{11}$', '$\\frac{68}{50}$'],
      correctIndex: 0,
    },
  },
  {
    id: 3,
    moduleId: 3,
    topic: 'Induction',
    question:
      'Prove that $\\sum_{r=1}^{n} r(r+1) = \\frac{n(n+1)(n+2)}{3}$ for all $n \\in \\mathbb{N}$.',
    hint: 'Check $n=1$ first, assume true for $n=k$, then add $(k+1)(k+2)$ to $\\frac{k(k+1)(k+2)}{3}$ and factor out $(k+1)(k+2)$.',
    solutionSteps: [
      '**Base Case ($n=1$):** $\\text{LHS} = 1(2) = 2$. $\\text{RHS} = \\frac{1(2)(3)}{3} = 2$. True for $n=1$.',
      '**Inductive Hypothesis:** Assume $\\sum_{r=1}^{k} r(r+1) = \\frac{k(k+1)(k+2)}{3}$ for some $k \\ge 1$.',
      '**Inductive Step ($n=k+1$):** $$\\sum_{r=1}^{k+1} r(r+1) = \\frac{k(k+1)(k+2)}{3} + (k+1)(k+2)$$',
      'Factor out $(k+1)(k+2)$: $$= (k+1)(k+2)\\left(\\frac{k}{3} + 1\\right) = \\frac{(k+1)(k+2)(k+3)}{3}$$',
      'This is the target formula with $n = k+1$. By PMI, the identity holds for all $n \\in \\mathbb{N}$.',
    ],
    answer: 'Proved for all $n \\in \\mathbb{N}$ by Mathematical Induction.',
    checkQuestion: {
      prompt: 'Using the formula, what is $\\sum_{r=1}^{5} r(r+1)$?',
      options: ['$55$', '$70$', '$90$', '$112$'],
      correctIndex: 1,
      },
  },
  {
    id: 4,
    moduleId: 4,
    topic: 'Series',
    question:
      'The $2$nd and $5$th terms of a GP are $6$ and $48$ respectively. Find the sum of the first $6$ terms.',
    hint: 'Use $T_2 = ar = 6$ and $T_5 = ar^4 = 48$. Divide $T_5$ by $T_2$ to find $r^3$.',
    solutionSteps: [
      'Write the GP terms: $T_2 = ar = 6$ and $T_5 = ar^4 = 48$.',
      'Divide $T_5$ by $T_2$: $\\frac{ar^4}{ar} = \\frac{48}{6} \\implies r^3 = 8 \\implies r = 2$.',
      'Substitute $r = 2$ into $ar = 6$: $2a = 6 \\implies a = 3$.',
      'Compute $S_6$ using $S_n = \\frac{a(r^n - 1)}{r - 1}$: $$S_6 = \\frac{3(2^6 - 1)}{2 - 1} = 3(64 - 1) = 3 \\times 63 = 189$$',
    ],
    answer: '$S_6 = 189$ (with $a = 3, r = 2$)',
    checkQuestion: {
      prompt: 'What is the sum of the first $6$ terms $S_6$?',
      options: ['$93$', '$189$', '$192$', '$381$'],
      correctIndex: 1,
    },
  },
  {
    id: 5,
    moduleId: 5,
    topic: 'Quadratics',
    question:
      'Find the range of values of $k$ for which $kx^2 + 4x + k = 0$ has real and distinct roots.',
    hint: 'A quadratic equation has real and distinct roots when $k \\neq 0$ and discriminant $\\Delta = b^2 - 4ac > 0$.',
    solutionSteps: [
      'For the equation to be quadratic with distinct real roots, we need $k \\neq 0$ and $\\Delta = b^2 - 4ac > 0$.',
      'Substitute $a = k, b = 4, c = k$: $4^2 - 4(k)(k) > 0 \\implies 16 - 4k^2 > 0$.',
      'Divide by $4$: $4 - k^2 > 0 \\implies k^2 < 4 \\implies -2 < k < 2$.',
      'Exclude $k = 0$ (since $k = 0$ reduces the equation to linear $4x = 0$, which has only one root).',
    ],
    answer: '$-2 < k < 2,\\; k \\neq 0$ (or $(-2, 0) \\cup (0, 2)$)',
    checkQuestion: {
      prompt: 'Which range accurately describes $k$ for real and distinct roots?',
      options: [
        '$-2 < k < 2$',
        '$-2 < k < 2$ and $k \\neq 0$',
        '$k < -2$ or $k > 2$',
        '$-4 < k < 4$',
      ],
      correctIndex: 1,
    },
  },
  {
    id: 6,
    moduleId: 6,
    topic: 'Binomial',
    question:
      'Find the term independent of $x$ in the expansion of $\\left(x^2 - \\frac{2}{x}\\right)^9$.',
    hint: 'Write the $(r+1)$th term $T_{r+1}$, collect powers of $x$ into $x^{18 - 3r}$, and set the exponent equal to $0$.',
    solutionSteps: [
      'Write the general term: $$T_{r+1} = \\binom{9}{r}(x^2)^{9-r}\\left(-\\frac{2}{x}\\right)^r = \\binom{9}{r}(-2)^r x^{18 - 2r - r} = \\binom{9}{r}(-2)^r x^{18 - 3r}$$',
      'For the term independent of $x$, set $18 - 3r = 0 \\implies r = 6$.',
      'Evaluate $T_7$: $$T_7 = \\binom{9}{6}(-2)^6 = \\frac{9 \\times 8 \\times 7}{3 \\times 2 \\times 1} \\times 64 = 84 \\times 64 = 5376$$',
    ],
    answer: '$5376$',
    checkQuestion: {
      prompt: 'What is the value of the term independent of $x$?',
      options: ['$-5376$', '$1344$', '$5376$', '$672$'],
      correctIndex: 2,
    },
  },
  {
    id: 7,
    moduleId: 8,
    topic: 'Complex Numbers & De Moivre',
    question:
      'Express $z = 1 - i$ in polar form and hence evaluate $(1 - i)^8$. Find the fourth roots of $-16$.',
    hint: 'For $1-i$, $r = \\sqrt{2}$ and $\\theta = -\\frac{\\pi}{4}$ (Quadrant IV). For $-16$, write $-16 = 16(\\cos\\pi + i\\sin\\pi)$ and apply the $n$th root formula with $n=4$.',
    solutionSteps: [
      '**Part 1 (Polar form & power):** For $z = 1 - i$, $r = \\sqrt{1^2 + (-1)^2} = \\sqrt{2}$ and $\\text{Arg}(z) = -\\frac{\\pi}{4}$. Thus $z = \\sqrt{2}\\left(\\cos\\left(-\\frac{\\pi}{4}\\right) + i\\sin\\left(-\\frac{\\pi}{4}\\right)\\right)$.',
      'By De Moivre’s theorem: $$(1 - i)^8 = (\\sqrt{2})^8\\left[\\cos(-2\\pi) + i\\sin(-2\\pi)\\right] = 16(1 + 0i) = 16$$',
      '**Part 2 (Fourth roots of $-16$):** Write $-16 = 16\\big(\\cos(\\pi + 2k\\pi) + i\\sin(\\pi + 2k\\pi)\\big)$.',
      'Take fourth roots ($16^{1/4} = 2$) for $k = 0, 1, 2, 3$: $z_k = 2\\left[\\cos\\left(\\frac{\\pi + 2k\\pi}{4}\\right) + i\\sin\\left(\\frac{\\pi + 2k\\pi}{4}\\right)\\right]$.',
      'Evaluate each root: $z_0 = \\sqrt{2} + \\sqrt{2}i$, $z_1 = -\\sqrt{2} + \\sqrt{2}i$, $z_2 = -\\sqrt{2} - \\sqrt{2}i$, $z_3 = \\sqrt{2} - \\sqrt{2}i$.',
    ],
    answer: '$(1-i)^8 = 16$; Fourth roots of $-16$: $\\pm\\sqrt{2} \\pm \\sqrt{2}i$',
    checkQuestion: {
      prompt: 'What is $(1 - i)^8$?',
      options: ['$-16$', '$16$', '$16i$', '$8$'],
      correctIndex: 1,
    },
  },
  {
    id: 8,
    moduleId: 9,
    topic: 'Trigonometry',
    question:
      'Prove that $\\frac{\\sin 5x + \\sin 3x}{\\cos 5x + \\cos 3x} = \\tan 4x$, and solve $2\\sin^2 x + \\cos x - 1 = 0$ for $0^\\circ \\le x \\le 360^\\circ$.',
    hint: 'Apply sum-to-product factor formulae to numerator and denominator. For the equation, replace $\\sin^2 x$ with $1 - \\cos^2 x$ to obtain a quadratic in $\\cos x$.',
    solutionSteps: [
      '**Part 1 (Identity):** Apply sum-to-product formulae with $P = 5x, Q = 3x$: $$\\frac{\\sin 5x + \\sin 3x}{\\cos 5x + \\cos 3x} = \\frac{2\\sin 4x \\cos x}{2\\cos 4x \\cos x} = \\frac{\\sin 4x}{\\cos 4x} = \\tan 4x$$',
      '**Part 2 (Equation):** Substitute $\\sin^2 x = 1 - \\cos^2 x$: $$2(1 - \\cos^2 x) + \\cos x - 1 = 0 \\implies 2\\cos^2 x - \\cos x - 1 = 0$$',
      'Factorize: $(2\\cos x + 1)(\\cos x - 1) = 0 \\implies \\cos x = -\\frac{1}{2}$ or $\\cos x = 1$.',
      'On $0^\\circ \\le x \\le 360^\\circ$: $\\cos x = 1 \\implies x = 0^\\circ, 360^\\circ$; $\\cos x = -\\frac{1}{2} \\implies x = 120^\\circ, 240^\\circ$.',
    ],
    answer: '$x \\in \\{0^\\circ, 120^\\circ, 240^\\circ, 360^\\circ\\}$',
    checkQuestion: {
      prompt: 'Which is the full solution set of $2\\sin^2 x + \\cos x - 1 = 0$ on $[0^\\circ, 360^\\circ]$?',
      options: [
        '$\\{0^\\circ, 60^\\circ, 300^\\circ, 360^\\circ\\}$',
        '$\\{0^\\circ, 120^\\circ, 240^\\circ, 360^\\circ\\}$',
        '$\\{90^\\circ, 120^\\circ, 240^\\circ\\}$',
        '$\\{60^\\circ, 120^\\circ, 240^\\circ\\}$',
      ],
      correctIndex: 1,
    },
  },
];
