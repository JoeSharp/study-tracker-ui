import { Specification } from "./types";

const ocrALevelComputerScience: Specification = {
  examBoard: "OCR",
  subject: "Computer Science",
  qualificationCode: "H446",
  components: [
    {
      name: "Computer Systems",
      sections: [
        {
          title:
            "The characteristics of contemporary processors, input, output and storage devices",
          description: "Components of a computer and their uses",
          subsections: [
            {
              title: "Structure and function of the processor",
              requirements: [
                "The Arithmetic and Logic Unit; ALU, Control Unit and Registers (Program Counter; PC, Accumulator; ACC, Memory Address Register; MAR, Memory Data Register; MDR, Current Instruction Register; CIR). Buses: data, address and control: how this relates to assembly language programs.",
                "The Fetch-Decode-Execute Cycle; including its effects on registers.",
                "The factors affecting the performance of the CPU: clock speed, number of cores, cache.",
                "The use of pipelining in a processor to improve efficiency.",
                "Von Neumann, Harvard and contemporary processor architecture.",
              ],
            },
            {
              title: "Types of processor",
              requirements: [
                "The differences between and uses of CISC and RISC processors.",
                "GPUs and their uses (including those not related to graphics)",
                "Multi-core and Parallel systems",
              ],
            },
            {
              title: "Input, Output and Storage",
              requirements: [
                "How different input, output and storage devices can be applied to the solution of different problems.",
                " The uses of magnetic, flash and optical storage devices.",
                "RAM and ROM.",
                " Virtual storage.",
              ],
            },
          ],
        },
        {
          title: "Software and Software Development",
          description:
            "Types of software and the different methodologies used to develop software",
          subsections: [
            {
              title: "Systems Software",
              requirements: [
                "The need for, function and purpose of operating systems.",
                "Memory Management (paging, segmentation and virtual memory).",
                "Interrupts, the role of interrupts and Interrupt Service Routines (ISR), role within the Fetch-Decode-Execute Cycle.",
                "Scheduling: round robin, first come first served, multi-level feedback queues, shortest job first and shortest remaining time.",
                "Distributed, embedded, multi-tasking, multi-user and Real Time operating systems.",
                "BIOS.",
                "Device drivers.",
                "Virtual machines, any instance where software is used to take on the function of a machine, including executing intermediate code or running an operating system within another.",
              ],
            },
            {
              title: "Applications Generation",
              requirements: [
                " The nature of applications, justifying suitable applications for a specific purpose.",
                "Utilities.",
                "Open source vs closed source.",
                "Translators:Interpreters, compilers and assemblers.",
                "Stages of compilation (lexical analysis, syntax analysis, code generation and optimisation).",
                "Linkers and loaders and use of libraries.",
              ],
            },
            {
              title: "Software Development",
              requirements: [
                "Understand the waterfall lifecycle, agile methodologies, extreme programming, the spiral model and rapid application development.",
                "The relative merits and drawbacks of different methodologies and when they might be used.",
                "Writing and following algorithms.",
              ],
            },
            {
              title: "Types of Programming Language",
              requirements: [
                "Need for and characteristics of a variety of programming paradigms.",
                "Procedural languages.",
                "Assembly language (including following and writing simple programs with the Little Man Computer instruction set). See appendix 5d.",
                "Modes of addressing memory (immediate, direct, indirect and indexed).",
                "Object-oriented languages (see appendix 5d for pseudocode style) with an understanding of classes, objects, methods, attributes, inheritance, encapsulation and polymorphism.",
              ],
            },
          ],
        },
        {
          title: "Exchanging Data",
          description: "How data is exchanged between different systems",
          subsections: [
            {
              title: "Compression, Encryption and Hashing",
              requirements: [
                "Lossy vs Lossless compression.",
                "Run length encoding and dictionary coding for lossless compression.",
                "Symmetric and asymmetric encryption.",
                "Different uses of hashing.",
              ],
            },
            {
              title: "Databases",
              requirements: [
                " Relational database, flat file, primary key, foreign key, secondary key, entity relationship modelling, normalisation and indexing. See appendix 5f.",
                "Methods of capturing, selecting, managing and exchanging data.",
                "Normalisation to 3NF.",
                "SQL – Interpret and modify. See appendix 5d.",
                "Referential integrity.",
                "Transaction processing, ACID (Atomicity, Consistency, Isolation, Durability), record locking and redundancy.",
              ],
            },
            {
              title: "Networks",
              requirements: [
                "Characteristics of networks and the importance of protocols and standards.",
                `The internet structure:
• The TCP/IP Stack.
• DNS
• Protocol layering.
• LANs and WANs.
• Packet and circuit switching.`,
                "Network security and threats, use of firewalls, proxies and encryption.",
                "Network hardware.",
                "Client-server and peer to peer.",
              ],
            },
            {
              title: "Web Technologies",
              requirements: [
                "HTML, CSS and JavaScript. See appendix 5d",
                "Search engine indexing.",
                "PageRank algorithm.",
                "Server and client side processing.",
              ],
            },
          ],
        },
        {
          title: "Data types, data structures and algorithms",
          description:
            "How data is represented and stored within different structures. Different algorithms that can be applied to these structures",
          subsections: [
            {
              title: "Data Types",
              requirements: [
                "Primitive data types, integer, real/floating point, character, string and Boolean.",
                "Represent positive integers in binary.",
                "Use of sign and magnitude and two’s complement to represent negative numbers in binary.",
                "Addition and subtraction of binary integers.",
                "Represent positive integers in hexadecimal.",
                "Convert positive integers between binary hexadecimal and denary.",
                "Representation and normalisation of floating point numbers in binary.",
                "Floating point arithmetic, positive and negative numbers, addition and subtraction.",
                "Bitwise manipulation and masks: shifts, combining with AND, OR, and XOR.",
                "How character sets (ASCII and UNICODE) are used to represent text.",
              ],
            },
            {
              title: "Data Structures",
              requirements: [
                "Arrays (of up to 3 dimensions), records, lists, tuples.",
                "The following structures to store data: linked-list, graph (directed and undirected), stack, queue, tree, binary search tree, hash table.",
                "How to create, traverse, add data to and remove data from the data structures mentioned above. (NB this can be either using arrays and procedural programming or an object-oriented approach).",
              ],
            },
            {
              title: "Boolean Algebra",
              requirements: [
                "Define problems using Boolean logic. See appendix 5d.",
                "Manipulate Boolean expressions, including the use of Karnaugh maps to simplify Boolean expressions.",
                "Use the following rules to derive or simplify statements in Boolean algebra: De Morgan’s Laws, distribution, association, commutation, double negation.",
                "Using logic gate diagrams and truth tables. See appendix 5d.",
                "The logic associated with D type flip flops, half and full adders.",
              ],
            },
          ],
        },
        {
          title: " Legal, moral, cultural and ethical issues",
          description:
            "The individual moral, social, ethical and cultural opportunities and risks of digital technology. Legislation surrounding the use of computers and ethical issues that can or may in the future arise from the use of computers",
          subsections: [
            {
              title: "Computing related legislation",
              requirements: [
                "The Data Protection Act 1998.",
                "The Computer Misuse Act 1990.",
                "The Copyright Design and Patents Act 1988.",
                "The Regulation of Investigatory Powers Act 2000.",
              ],
            },
            {
              title: "Moral and Ethical Issues",
              requirements: [
                `The individual moral, social, ethical and cultural opportunities and risks of digital technology:
                • Computers in the workforce.
                • Automated decision making.
                • Artificial intelligence.
                • Environmental effects.
                • Censorship and the Internet.
                • Monitor behaviour.
                • Analyse personal information.
                • Piracy and offensive communications.
                • Layout, colour paradigms and character sets.`,
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Algorithms and Programming",
      sections: [
        {
          title: "Elements of computational thinking",
          description: "Understand what is meant by computational thinking",
          subsections: [
            {
              title: "Thinking abstractly",
              requirements: [
                "The nature of abstraction.",
                "The need for abstraction.",
                "The differences between an abstraction and reality.",
                "Devise an abstract model for a variety of situations.",
              ],
            },
            {
              title: "Thinking ahead",
              requirements: [
                "Identify the inputs and outputs for a given situation.",
                "Determine the preconditions for devising a solution to a problem.",
                "The nature,benefits and drawbacks of caching.",
                "The need for reusable program components.",
              ],
            },
            {
              title: "Thinking procedurally",
              requirements: [
                "Identify the components of a problem.",
                "Identify the components of a solution to a problem.",
                "Determine the order of the steps needed to solve a problem.",
                "Identify sub-procedures necessary to solve a problem.",
              ],
            },
            {
              title: "Thinking logically",
              requirements: [
                "Identify the points in a solution where a decision has to be taken.",
                "Determine the logical conditions that affect the outcome of a decision.",
                "Determine how decisions affect flow through a program.",
              ],
            },
            {
              title: "Thinking concurrently",
              requirements: [
                "Determine the parts of a problem that can be tackled at the same time.",
                "Outline the benefits and trade offs that might result from concurrent processing in a particular situation.",
              ],
            },
          ],
        },
        {
          title: "Problem Solving and Programming",
          description:
            "How computers can be used to solve problems and programs can be written to solve them (Learners will benefit from being able to program in a procedure/imperative language and object oriented language.)",
          subsections: [
            {
              title: "Programming Techniques",
              requirements: [
                "Programming constructs: sequence, iteration, branching.",
                "Recursion, how it can be used and compares to an iterative approach.",
                "Global and local variables.",
                "Modularity, functions and procedures, parameter passing by value and by reference.",
                "Use of an IDE to develop/debug a program.",
                "Use of object oriented techniques.",
              ],
            },
            {
              title: "Computational Methods",
              requirements: [
                "Features that make a problem solvable by computational methods.",
                "Problem recognition.",
                "Problem decomposition.",
                "Use of divide and conquer.",
                "Use of abstraction.",
                `Learners should apply their knowledge of:
• backtracking
• data mining
• heuristics
• performance modelling
• pipelining
• visualisation to solve problems.`,
              ],
            },
          ],
        },
        {
          title: "Algorithms",
          description:
            "The use of algorithms to describe problems and standard algorithms",
          subsections: [
            {
              title: "Algorithms",
              requirements: [
                "Analysis and design of algorithms for a given situation.",
                "The suitability of different algorithms for a given task and data set, in terms of execution time and space.",
                "Measures and methods to determine the efficiency of different algorithms, Big O notation (constant, linear, polynomial, exponential and logarithmic complexity).",
                "Comparison of the complexity of algorithms.",
                "Algorithms for the main data structures, (stacks, queues, trees, linked lists, depth-first (post-order) and breadth-first traversal of trees).",
                "Standard algorithms (bubble sort, insertion sort, merge sort, quick sort, Dijkstra’s shortest path algorithm, A* algorithm, binary search and linear search).",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "NEA Programming Project",
      sections: [
        {
          title: "Analysis of the Problem",
          subsections: [
            {
              title: "Problem Identification",
              requirements: [
                "Describe and justify the features that make the problem solvable by computational methods.",
                "Explain why the problem is amenable to a computational approach.",
              ],
            },
            {
              title: "Stakeholders",
              requirements: [
                "Identify and describe those who will have an interest in the solution explaining how the solution is appropriate to their needs (this may be named individuals, groups or persona that describes the target end user).",
              ],
            },
            {
              title: "Research the Problem",
              requirements: [
                "Research the problem and solutions to similar problems to identify and justify suitable approaches to a solution.",
                "Describe the essential features of a computational solution explaining these choices.",
                "Explain the limitations of the proposed solution.",
              ],
            },
            {
              title: "Specific the Proposed Solution",
              requirements: [
                "Specify and justify the solution requirements including hardware and software configuration (if appropriate).",
                "Identify and justify measurable success criteria for the proposed solution.",
              ],
            },
          ],
        },
        {
          title: "Design of the Solution",
          subsections: [
            {
              title: "Decompose the Problem",
              requirements: [
                "Break down the problem into smaller parts suitable for computational solutions justifying any decisions made.",
              ],
            },
            {
              title: "Describe the Solution",
              requirements: [
                "Explain and justify the structure of the solution.",
                "Describe the parts of the solution using algorithms justifying how these algorithms form a complete solution to the problem.",
                "Describe usability features to be included in the solution.",
                "Identify key variables / data structures / classes justifying choices and any necessary validation.",
              ],
            },
            {
              title: "Describe the Approach to Testing",
              requirements: [
                "Identify the test data to be used during the iterative development and post development phases and justify the choice of this test data.",
              ],
            },
          ],
        },
        {
          title: "Developing the Solution",
          subsections: [
            {
              title: "Iterative Development Process",
              requirements: [
                "Provide annotated evidence of each stage of the iterative development process justifying any decision made.",
                "Provide annotated evidence of prototype solutions justifying any decision made.",
              ],
            },
            {
              title: "Testing to Inform Development",
              requirements: [
                "Provide annotated evidence for testing at each stage justifying the reason for the test.",
                "Provide annotated evidence of any remedial actions taken justifying the decision made.",
              ],
            },
          ],
        },
        {
          title: "Evaluation",
          subsections: [
            {
              title: "Testing to inform evaluation",
              requirements: [
                "Provide annotated evidence of testing the solution of robustness at the end of the development process.",
                "Provide annotated evidence of usability testing (user feedback).",
              ],
            },
            {
              title: "Success of the Solution",
              requirements: [
                "Use the test evidence from the development and post development process to evaluate the solution against the success criteria from the analysis.",
              ],
            },
            {
              title: "Describe the final product",
              requirements: [
                "Provide annotated evidence of the usability features from the design, commenting on their effectiveness.",
              ],
            },
            {
              title: "Maintenance and development",
              requirements: [
                "Discuss the maintainability of the solution. (b) Discuss potential further development of the solution.",
              ],
            },
          ],
        },
      ],
    },
  ],
};

interface UseSpec {
  specification: Specification;
}

const useSpec = (): UseSpec => {
  return {
    specification: ocrALevelComputerScience,
  };
};

export default useSpec;
