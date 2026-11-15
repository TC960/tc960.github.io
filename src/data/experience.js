// Work and leadership history shown on the home page, newest first.
// Entries with `roles` render each role under one organization.
export const experience = [
  {
    date: "Jun 2026 - Sep 2026",
    title: "Applied AI Intern",
    company: "BCG X",
    location: "San Francisco, CA",
    description: "Owned the end-to-end skill deployment pipeline behind a firm-wide AI rollout, taking agent skills from local dev to production across a multi-environment stack: Claude Desktop, a custom EC2 orchestrator, and a Dockerized CMA on EC2 with nginx. Built an agentic porting microtool that automated cross-environment migration end to end. Designed the testing framework and automated QA gate that let the team iterate on agent skills safely at scale, replacing manual review with automated validation, and built a binary classifier to gate the CI pipeline so the suite fires only on valid, test-worthy changes. Helped build and QA the agent skills themselves, now shipping firm-wide across BCG.",
  },
  {
    date: "Oct 2025 - Present",
    company: "DS3 UCSD, DataHacks Board",
    location: "La Jolla, CA",
    roles: [
      {
        date: "Apr 2026 - Present",
        title: "Hackathon Co-Director",
        description: "Co-directed a 100-person, defense-oriented hackathon run in partnership with Bow Capital and the Startup Incubator Club. Owned end-to-end event organization (partnerships, sponsorship, logistics, and judging), bringing together students, VCs, and industry around defense-focused builds.",
      },
      {
        date: "Oct 2025 - Apr 2026",
        title: "Lead Board Member",
        description: "Developed the judging platform and worked on the programming competition.",
      },
    ],
  },
  {
    date: "Feb 2025 - Present",
    title: "Undergraduate Research Assistant",
    company: "Knight Lab, UC San Diego",
    location: "La Jolla, CA",
    description: "Building the extraction and evaluation stack behind a microbe-disease knowledge graph for the MicrobiologyMetadataCrisis Project (250+ members). Benchmarked 5 open-weight GGUF extractors on H100s under one grammar-constrained harness, and raised best-model F1 from 0.642 to 0.84 without changing a single model output, by replacing character n-gram similarity with NCBI-lineage ancestor matching and re-annotating a gold standard that was missing ~70 genuinely stated taxa. Ran a 5-method sweep (single-shot, RELATE, grounded, normalization, LLM-judge) and rejected 4 on measured evidence, documenting rather than discarding a data leak that had inflated the judge condition. Separately ported a 13,092-paper accession pipeline off Google Apps Script to Python with a content-addressed cache, cutting a 5-hour multi-day job to ~1 hour and recovering 1,176 additional codes, then triaged every paper into coded / verified-empty / needs-review under an explicit evidence rule backed by three falsification audits.",
  },
  {
    date: "2025 - Present",
    title: "Undergraduate Research Assistant",
    company: "MOSAIC Lab, UC San Diego",
    location: "La Jolla, CA",
    description: "Conducting research on biosensor technologies for health monitoring and physiological signal processing under Prof. Tauhidur Rahman (mentored by PhD candidate Rahath Malladi). Focused on biosensor development and signal processing for wearable health sensing.",
  },
  {
    date: "Oct 2025 - Present",
    title: "EMG Translator Project Lead",
    company: "Triton NeuroTech",
    location: "La Jolla, CA",
    description: "Leading team of 11 engineers building wearable EMG system translating ASL gestures to text/speech. Managing two tracks: Interface/Dashboard team (ML inference, visualization) and Portable Speech team (Arduino/ESP32, audio synthesis). Full data pipeline from MindRove 4-channel sEMG acquisition to model deployment, later integrating Meta's emg2pose to generalize past the 4-channel limit.",
  },
  {
    date: "Sep 2025 - Jan 2026",
    title: "Undergraduate Research Assistant",
    company: "ProtoLab, UC San Diego Design Lab",
    location: "San Diego, CA",
    description: "Built audio processing pipeline with pyannote.ai + Whisper Large V3, optimized on A100 GPU (40% faster). Designed multi-agent conversational AI for mock interviews with configurable personas. Achieved 60-70% latency reduction through parallel processing pipeline. Compared OpenAI models, open-source LLMs + 11Labs, and NVIDIA ACE framework.",
  },
  {
    date: "Jun 2025 - Sep 2025",
    title: "FRAC Intern",
    company: "EXL",
    location: "La Jolla, CA",
    description: "Contributing to development of RiskXpert, an Agentic AI tool for automated insurance and risk analysis, focusing on risk assessment frameworks and control identification methodologies. Analyzing risk descriptions and implementing control mechanisms to enhance automated risk evaluation processes. Collaborating on AI/ML-driven risk assessment to streamline insurance underwriting through automation. Conducted an in-depth case study on potential OCR tool suggestions to be incorporated with the tool, ranging from on-the-fly SoTA methods, to from-the-ground-up approaches, comparing metrics like computational cost, efficiency and financial impact.",
  },
  {
    date: "Mar 2025 - Aug 2025",
    title: "Tutor",
    company: "Halıcıoğlu Data Science Institute, UC San Diego",
    location: "La Jolla, CA",
    description: "Provided tutoring support for DSC 40A (Kyle M. Shannon: SP24) and DSC 20 (Brendan Tomoschuk: SA1 25), helping students understand fundamental concepts in data science and programming.",
  },
  {
    date: "Aug 2024 - Sep 2024",
    title: "Computer Science and AI Intern",
    company: "300plus Consulting Services",
    location: "Delhi, India",
    description: "Developed a software integrated into interviews for better analysis of the candidate. Leveraged python and its libraries to convert video data to text, followed by deploying LLMs and GenAI to evaluate answer relevance, scoring responses based on fluency, coherence, and technical accuracy. Currently working on developing an integrated solution with a built-in plagiarism checker to verify answer authenticity and prevent AI-generated or internet-copied content.",
  },
  {
    date: "Jun 2024 - Sep 2024",
    title: "AI & ML Intern",
    company: "Indian Institute of Technology, Guwahati",
    location: "Remote",
    description: "Worked on developing and evaluating Spiking Neural Networks (SNNs) to improve real-time pattern recognition and object detection compared to traditional Artificial Neural Networks (ANNs). Designed and optimized various SNN architectures, tuning parameters for enhanced performance. Evaluated models using metrics like accuracy, precision, and F1-score, addressing challenges in training and encoding.",
  },
];
