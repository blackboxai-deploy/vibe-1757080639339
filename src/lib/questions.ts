export interface Question {
  id: string;
  topic: 'finite-automata' | 'regular-languages' | 'cfg' | 'pda' | 'turing-machines' | 'complexity';
  difficulty: 'basic' | 'intermediate' | 'advanced';
  type: 'definition' | 'explanation' | 'construction' | 'proof' | 'scenario';
  question: string;
  answer: string;
  points: number;
}

export const questions: Question[] = [
  // FINITE AUTOMATA - Basic
  {
    id: "fa-basic-1",
    topic: "finite-automata",
    difficulty: "basic",
    type: "definition",
    question: "What is the formal definition of a DFA? List all components.",
    answer: "A DFA is a 5-tuple (Q, Σ, δ, q₀, F) where: Q is a finite set of states, Σ is a finite alphabet, δ: Q × Σ → Q is the transition function, q₀ ∈ Q is the start state, and F ⊆ Q is the set of accept states.",
    points: 5
  },
  {
    id: "fa-basic-2",
    topic: "finite-automata",
    difficulty: "basic",
    type: "definition",
    question: "How does an NFA differ from a DFA in terms of the transition function?",
    answer: "In an NFA, the transition function δ: Q × Σ_ε → P(Q) maps to the power set of states, allowing multiple transitions or no transitions from a state on an input symbol, including ε-transitions.",
    points: 4
  },
  {
    id: "fa-basic-3",
    topic: "finite-automata",
    difficulty: "basic",
    type: "explanation",
    question: "What does it mean for two automata to be equivalent?",
    answer: "Two automata are equivalent if they recognize (accept) the same language, i.e., L(M₁) = L(M₂).",
    points: 3
  },

  // FINITE AUTOMATA - Intermediate
  {
    id: "fa-int-1",
    topic: "finite-automata",
    difficulty: "intermediate",
    type: "construction",
    question: "Describe the subset construction algorithm for converting an NFA to a DFA.",
    answer: "1. Each state in the DFA corresponds to a subset of NFA states. 2. Start state is ε-closure of NFA start state. 3. For each DFA state and input symbol, compute the union of transitions from all NFA states in the subset. 4. Accept states are those containing at least one NFA accept state.",
    points: 6
  },
  {
    id: "fa-int-2",
    topic: "finite-automata",
    difficulty: "intermediate",
    type: "scenario",
    question: "Given an NFA with n states, what is the maximum number of states the equivalent DFA can have?",
    answer: "2^n states, since each DFA state corresponds to a subset of the NFA states, and there are 2^n possible subsets.",
    points: 4
  },
  {
    id: "fa-int-3",
    topic: "finite-automata",
    difficulty: "intermediate",
    type: "construction",
    question: "Explain the process of DFA minimization using the table-filling algorithm.",
    answer: "1. Create a table of all pairs of states. 2. Mark pairs where one is accepting and one is not. 3. For unmarked pairs (p,q), if δ(p,a) and δ(q,a) are marked for any symbol a, mark (p,q). 4. Repeat until no new pairs are marked. 5. Merge all unmarked pairs into equivalence classes.",
    points: 7
  },

  // FINITE AUTOMATA - Advanced
  {
    id: "fa-adv-1",
    topic: "finite-automata",
    difficulty: "advanced",
    type: "proof",
    question: "Prove that every NFA has an equivalent DFA using a formal construction.",
    answer: "Given NFA N = (Q_N, Σ, δ_N, q₀, F_N), construct DFA D = (Q_D, Σ, δ_D, q₀_D, F_D) where: Q_D = P(Q_N), q₀_D = ε-closure({q₀}), F_D = {S ∈ Q_D | S ∩ F_N ≠ ∅}, δ_D(S,a) = ε-closure(⋃_{q∈S} δ_N(q,a)). Proof by induction on input length shows L(N) = L(D).",
    points: 10
  },

  // REGULAR LANGUAGES - Basic
  {
    id: "rl-basic-1",
    topic: "regular-languages",
    difficulty: "basic",
    type: "definition",
    question: "What is a regular expression? Define the basic operations.",
    answer: "A regular expression over alphabet Σ is built from: ∅ (empty set), ε (empty string), symbols from Σ, and operations: union (|), concatenation (·), and Kleene star (*).",
    points: 4
  },
  {
    id: "rl-basic-2",
    topic: "regular-languages",
    difficulty: "basic",
    type: "definition",
    question: "State the definition of a regular language.",
    answer: "A language L is regular if there exists a finite automaton (DFA or NFA) that recognizes L, or equivalently, if L can be described by a regular expression.",
    points: 3
  },
  {
    id: "rl-basic-3",
    topic: "regular-languages",
    difficulty: "basic",
    type: "explanation",
    question: "What are the closure properties of regular languages under union?",
    answer: "Regular languages are closed under union: if L₁ and L₂ are regular, then L₁ ∪ L₂ is regular. This can be proven by constructing an NFA that has ε-transitions to the start states of both automata.",
    points: 4
  },

  // REGULAR LANGUAGES - Intermediate
  {
    id: "rl-int-1",
    topic: "regular-languages",
    difficulty: "intermediate",
    type: "construction",
    question: "Describe the product construction for showing regular languages are closed under intersection.",
    answer: "Given DFAs M₁ = (Q₁, Σ, δ₁, q₁, F₁) and M₂ = (Q₂, Σ, δ₂, q₂, F₂), construct M = (Q₁×Q₂, Σ, δ, (q₁,q₂), F₁×F₂) where δ((q₁,q₂), a) = (δ₁(q₁,a), δ₂(q₂,a)). The language L(M) = L(M₁) ∩ L(M₂).",
    points: 6
  },
  {
    id: "rl-int-2",
    topic: "regular-languages",
    difficulty: "intermediate",
    type: "scenario",
    question: "How do you convert a regular expression to an NFA using Thompson's construction?",
    answer: "Build recursively: 1) Base cases: ∅, ε, and single symbols get simple NFAs. 2) Union: Create new start state with ε-transitions to both sub-NFAs. 3) Concatenation: Connect accept states of first to start of second with ε-transitions. 4) Star: Add ε-transitions from accept to start and new start/accept states.",
    points: 7
  },
  {
    id: "rl-int-3",
    topic: "regular-languages",
    difficulty: "intermediate",
    type: "explanation",
    question: "What is the Myhill-Nerode theorem and what does it characterize?",
    answer: "The Myhill-Nerode theorem characterizes regular languages: A language L is regular if and only if it has finite index (finite number of equivalence classes under the relation x ≡_L y iff ∀z: xz ∈ L ⟺ yz ∈ L).",
    points: 6
  },

  // REGULAR LANGUAGES - Advanced
  {
    id: "rl-adv-1",
    topic: "regular-languages",
    difficulty: "advanced",
    type: "proof",
    question: "State and prove the Pumping Lemma for regular languages.",
    answer: "If L is regular, then ∃p≥1 such that ∀s∈L with |s|≥p, ∃x,y,z with s=xyz, |y|≥1, |xy|≤p, ∀i≥0: xy^i z∈L. Proof: Let p be the number of states in a DFA for L. Any string of length ≥p must visit some state twice by pigeonhole principle, creating a loop that can be pumped.",
    points: 10
  },
  {
    id: "rl-adv-2",
    topic: "regular-languages",
    difficulty: "advanced",
    type: "scenario",
    question: "Show that L = {a^n b^n | n ≥ 0} is not regular using the pumping lemma.",
    answer: "Assume L is regular with pumping length p. Consider s = a^p b^p ∈ L. By pumping lemma, s = xyz with |xy| ≤ p, |y| ≥ 1. Since |xy| ≤ p, y consists only of a's. Let y = a^k where k ≥ 1. Then xy²z = a^(p+k) b^p ∉ L, contradicting the pumping lemma. Therefore L is not regular.",
    points: 8
  },

  // CONTEXT-FREE GRAMMARS - Basic
  {
    id: "cfg-basic-1",
    topic: "cfg",
    difficulty: "basic",
    type: "definition",
    question: "Define a context-free grammar formally.",
    answer: "A CFG is a 4-tuple G = (V, Σ, R, S) where V is a finite set of variables, Σ is a finite alphabet of terminals, R is a finite set of production rules A → α where A ∈ V and α ∈ (V ∪ Σ)*, and S ∈ V is the start variable.",
    points: 5
  },
  {
    id: "cfg-basic-2",
    topic: "cfg",
    difficulty: "basic",
    type: "definition",
    question: "What is a derivation in a context-free grammar?",
    answer: "A derivation is a sequence of strings α₀, α₁, ..., αₖ where α₀ = S (start symbol), each αᵢ₊₁ is obtained from αᵢ by applying one production rule, and αₖ contains only terminal symbols.",
    points: 4
  },
  {
    id: "cfg-basic-3",
    topic: "cfg",
    difficulty: "basic",
    type: "explanation",
    question: "What is the difference between leftmost and rightmost derivations?",
    answer: "In a leftmost derivation, at each step the leftmost variable is replaced. In a rightmost derivation, at each step the rightmost variable is replaced. Both generate the same language but may produce different parse trees.",
    points: 4
  },

  // CONTEXT-FREE GRAMMARS - Intermediate
  {
    id: "cfg-int-1",
    topic: "cfg",
    difficulty: "intermediate",
    type: "construction",
    question: "Describe the conversion from CFG to Chomsky Normal Form.",
    answer: "1. Eliminate start symbol from RHS by adding new start symbol. 2. Eliminate null productions (A → ε). 3. Eliminate unit productions (A → B). 4. Convert remaining rules to form A → BC or A → a where A,B,C are variables and a is terminal.",
    points: 7
  },
  {
    id: "cfg-int-2",
    topic: "cfg",
    difficulty: "intermediate",
    type: "explanation",
    question: "What is the CYK parsing algorithm and what form of grammar does it require?",
    answer: "CYK (Cocke-Younger-Kasami) is a dynamic programming algorithm for parsing context-free languages. It requires the grammar to be in Chomsky Normal Form and has O(n³|G|) time complexity where n is string length.",
    points: 6
  },
  {
    id: "cfg-int-3",
    topic: "cfg",
    difficulty: "intermediate",
    type: "scenario",
    question: "How do you eliminate left recursion from a context-free grammar?",
    answer: "For immediate left recursion A → Aα | β, replace with A → βA', A' → αA' | ε. For indirect left recursion, first eliminate by substitution, then apply immediate left recursion elimination. Process variables in order to avoid cycles.",
    points: 6
  },

  // PUSHDOWN AUTOMATA - Basic
  {
    id: "pda-basic-1",
    topic: "pda",
    difficulty: "basic",
    type: "definition",
    question: "Define a pushdown automaton formally.",
    answer: "A PDA is a 6-tuple P = (Q, Σ, Γ, δ, q₀, F) where Q is states, Σ is input alphabet, Γ is stack alphabet, δ: Q × Σ_ε × Γ_ε → P(Q × Γ_ε) is transition function, q₀ is start state, F is accept states.",
    points: 6
  },
  {
    id: "pda-basic-2",
    topic: "pda",
    difficulty: "basic",
    type: "explanation",
    question: "What is the difference between acceptance by final state and acceptance by empty stack in PDAs?",
    answer: "Acceptance by final state: string is accepted if PDA reaches a final state after processing input. Acceptance by empty stack: string is accepted if stack becomes empty after processing input. Both methods are equivalent in power.",
    points: 5
  },
  {
    id: "pda-basic-3",
    topic: "pda",
    difficulty: "basic",
    type: "construction",
    question: "Design a PDA that accepts the language L = {a^n b^n | n ≥ 0}.",
    answer: "States: {q₀, q₁, q₂}. For each 'a', push X onto stack in q₀. On first 'b', transition to q₁. For each 'b' in q₁, pop X from stack. When stack empty and no more input, accept in q₂. δ includes: (q₀,a,ε)→(q₀,X), (q₀,b,X)→(q₁,ε), (q₁,b,X)→(q₁,ε), (q₁,ε,ε)→(q₂,ε).",
    points: 7
  },

  // PUSHDOWN AUTOMATA - Intermediate
  {
    id: "pda-int-1",
    topic: "pda",
    difficulty: "intermediate",
    type: "proof",
    question: "Prove that context-free languages are exactly those recognized by pushdown automata.",
    answer: "Two directions: (1) CFG → PDA: Simulate leftmost derivations using stack for working string. (2) PDA → CFG: For each PDA transition, create grammar productions that track stack changes. Variables represent (state, stack_bottom, state) triples.",
    points: 8
  },
  {
    id: "pda-int-2",
    topic: "pda",
    difficulty: "intermediate",
    type: "scenario",
    question: "Why can't a PDA recognize the language L = {a^n b^n c^n | n ≥ 0}?",
    answer: "A PDA has only one stack and can only access the top element. To verify equal numbers of a's, b's, and c's requires comparing three counts simultaneously, which exceeds the memory capability of a single stack. This language requires a Turing machine.",
    points: 6
  },

  // TURING MACHINES - Basic
  {
    id: "tm-basic-1",
    topic: "turing-machines",
    difficulty: "basic",
    type: "definition",
    question: "Define a Turing machine formally.",
    answer: "A TM is a 7-tuple M = (Q, Σ, Γ, δ, q₀, q_accept, q_reject) where Q is states, Σ is input alphabet, Γ is tape alphabet (Σ ⊆ Γ), δ: Q × Γ → Q × Γ × {L,R} is transition function, q₀ is start state, q_accept and q_reject are final states.",
    points: 6
  },
  {
    id: "tm-basic-2",
    topic: "turing-machines",
    difficulty: "basic",
    type: "explanation",
    question: "What is the Church-Turing thesis?",
    answer: "The Church-Turing thesis states that the intuitive notion of algorithms is captured precisely by Turing machines. Every effectively calculable function is computable by a Turing machine, and vice versa.",
    points: 5
  },
  {
    id: "tm-basic-3",
    topic: "turing-machines",
    difficulty: "basic",
    type: "definition",
    question: "Define what it means for a Turing machine to decide a language.",
    answer: "A Turing machine M decides language L if: for every string w ∈ L, M accepts w; for every string w ∉ L, M rejects w; and M halts on all inputs.",
    points: 4
  },

  // TURING MACHINES - Intermediate
  {
    id: "tm-int-1",
    topic: "turing-machines",
    difficulty: "intermediate",
    type: "construction",
    question: "Describe how to simulate a multitape Turing machine with a single-tape Turing machine.",
    answer: "Use single tape with multiple tracks (one per original tape). Use a special symbol to mark head positions. To simulate one step: scan entire tape to find all head positions, determine moves for each tape, update symbols and head positions. Increases time complexity from T(n) to O(T(n)²).",
    points: 8
  },
  {
    id: "tm-int-2",
    topic: "turing-machines",
    difficulty: "intermediate",
    type: "explanation",
    question: "What is the difference between decidable and recognizable languages?",
    answer: "A language is decidable (recursive) if some TM decides it (halts on all inputs). A language is recognizable (recursively enumerable) if some TM recognizes it (accepts strings in the language, may loop on strings not in the language). Every decidable language is recognizable, but not vice versa.",
    points: 6
  },

  // TURING MACHINES - Advanced
  {
    id: "tm-adv-1",
    topic: "turing-machines",
    difficulty: "advanced",
    type: "proof",
    question: "Prove that the halting problem is undecidable using diagonalization.",
    answer: "Assume TM H decides HALT_TM = {⟨M,w⟩ | M halts on w}. Construct TM D: on input ⟨M⟩, run H on ⟨M,⟨M⟩⟩. If H accepts, loop forever. If H rejects, accept. What does D do on ⟨D⟩? If D halts on ⟨D⟩, then D loops (contradiction). If D doesn't halt on ⟨D⟩, then D accepts (contradiction). Therefore H cannot exist.",
    points: 12
  },
  {
    id: "tm-adv-2",
    topic: "turing-machines",
    difficulty: "advanced",
    type: "scenario",
    question: "Show that ATM = {⟨M,w⟩ | M accepts w} is undecidable by reduction from HALT_TM.",
    answer: "Given decider R for A_TM, construct decider S for HALT_TM: On input ⟨M,w⟩, construct M' that on input x: simulates M on w; if M accepts w, accept x; if M rejects w, reject x. Run R on ⟨M',w⟩. M halts on w iff M' accepts w iff R accepts ⟨M',w⟩. Since HALT_TM is undecidable, A_TM is undecidable.",
    points: 10
  },

  // COMPLEXITY THEORY - Basic
  {
    id: "comp-basic-1",
    topic: "complexity",
    difficulty: "basic",
    type: "definition",
    question: "Define the complexity class P.",
    answer: "P is the class of languages decidable by a deterministic Turing machine in polynomial time. P = ⋃_{k≥1} TIME(n^k).",
    points: 4
  },
  {
    id: "comp-basic-2",
    topic: "complexity",
    difficulty: "basic",
    type: "definition",
    question: "Define the complexity class NP.",
    answer: "NP is the class of languages decidable by a nondeterministic Turing machine in polynomial time. Equivalently, NP is the class of languages verifiable by a polynomial-time deterministic TM.",
    points: 5
  },
  {
    id: "comp-basic-3",
    topic: "complexity",
    difficulty: "basic",
    type: "explanation",
    question: "What does it mean for a problem to be NP-complete?",
    answer: "A language L is NP-complete if: (1) L ∈ NP, and (2) every language in NP is polynomial-time reducible to L. NP-complete problems are the hardest problems in NP.",
    points: 5
  },

  // COMPLEXITY THEORY - Intermediate
  {
    id: "comp-int-1",
    topic: "complexity",
    difficulty: "intermediate",
    type: "explanation",
    question: "Describe the reduction used to show SAT is NP-complete (Cook-Levin theorem).",
    answer: "Given any NP language L and polynomial-time NTM N deciding L, construct a boolean formula φ that is satisfiable iff N accepts input w. φ encodes the computation tableau of N using variables for each cell, ensuring proper transitions, initial/final configurations, and accepting computation path.",
    points: 8
  },
  {
    id: "comp-int-2",
    topic: "complexity",
    difficulty: "intermediate",
    type: "scenario",
    question: "Show that 3SAT reduces to CLIQUE in polynomial time.",
    answer: "Given 3SAT formula φ with m clauses, construct graph G: create vertex for each literal in each clause. Connect vertices iff they're from different clauses and not complementary literals. φ is satisfiable iff G has clique of size m. A satisfying assignment corresponds to selecting one true literal per clause.",
    points: 7
  },

  // COMPLEXITY THEORY - Advanced
  {
    id: "comp-adv-1",
    topic: "complexity",
    difficulty: "advanced",
    type: "proof",
    question: "Define the polynomial hierarchy and explain its relationship to P and NP.",
    answer: "PH = ⋃_k Σ_k^P where Σ_0^P = Π_0^P = P, Σ_{k+1}^P = NP^{Σ_k^P}, Π_{k+1}^P = coNP^{Σ_k^P}. We have P ⊆ NP ⊆ Σ_1^P ⊆ Σ_2^P ⊆ ... ⊆ PH. If P = NP, then PH collapses to P. If any level Σ_k^P = Π_k^P, then PH collapses to that level.",
    points: 10
  }
];

export function getRandomQuestions(count: number = 20, difficulty?: 'basic' | 'intermediate' | 'advanced'): Question[] {
  let filteredQuestions = questions;
  
  if (difficulty) {
    filteredQuestions = questions.filter(q => q.difficulty === difficulty);
  }
  
  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getQuestionsByTopic(topic: string): Question[] {
  return questions.filter(q => q.topic === topic);
}

export function getTotalPoints(questionSet: Question[]): number {
  return questionSet.reduce((total, q) => total + q.points, 0);
}