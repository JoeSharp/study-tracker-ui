import { Specification } from "./types";

const ocrALevelComputerScience: Specification = {
  examBoard: "OCR",
  subject: "Computer Science",
  qualificationCode: "H446",
  components: [
    {
      name: "Content of Computer Systems",
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
