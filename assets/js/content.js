/*
 * Site content. Edit this file to update the homepage; no build step is needed.
 *
 *  PUBS        publications. Fields: t title, a authors (use * for equal contribution),
 *              v venue key (see VENUE), y year, l links [[label, url]], sel 1 = selected,
 *              first 1 = first or co-first author, img thumbnail key (see TEASERS), tags topics.
 *  PROJECTS    project cards and project pages (slug -> #project-<slug>).
 *  OVERVIEW*   paragraphs on each project page.
 *  NEWS        homepage news. `to` links a news item to a project page; items without `to`
 *              get their own post (#news-<slug>).
 *  EXPERIENCE, EDUCATION, EDU_THEME   the "My path so far" timeline.
 */
export const VENUE = {
  "COLM": "Conference on Language Modeling (COLM)", "ASSETS": "ASSETS, Posters and Demonstrations",
  "WWW": "The Web Conference (WWW), Demo Track", "arXiv": "arXiv preprint", "ACS": "Advances in Cognitive Systems",
  "NeurIPS": "Neural Information Processing Systems (NeurIPS)", "EJR Open": "European Journal of Radiology Open",
  "MICCAI": "MICCAI", "ICASSP": "ICASSP", "IEEE TIM": "IEEE Transactions on Instrumentation and Measurement",
  "IEEE Sensors": "IEEE Sensors Journal", "Sensors": "Sensors",
  "ACM TIST": "ACM Transactions on Intelligent Systems and Technology",
};

export const TOPICS = [["acc", "Accessibility"], ["spa", "Spatial reasoning"], ["llm", "Language and vision models"], ["hai", "Human-agent collaboration"], ["hea", "Health and sensing"]];

export const SCHOLAR = "https://scholar.google.com/citations?user=hLHzhqkAAAAJ";

export const PROJECTS = [
  { slug: "touchingspace", theme: "acc", pub: "\u201cI didn", name: "TouchingSpace", img: "ts_overview", figs: [["2609.36404", "System pipeline: map retrieval, map transformation, and exploration on the trackpad."]], venue: "Under review, 2026", short: "An audio-haptic map that blind and low-vision people explore by hand.",
    line: "An audio-haptic map that blind and low-vision people explore by hand on a laptop trackpad, asking a conversational agent open questions along the way. Studied with fourteen BLV participants.",
    links: [["arXiv", "https://arxiv.org/abs/2609.36404"], ["Video", "https://youtu.be/t3qaVIrDDa4"]] },
  { slug: "ascii", theme: "spa", pub: "Learning to Draw", name: "Learning to Draw ASCII", img: "colm", venue: "COLM 2026", short: "Drawing layouts from text improves spatial reasoning in language models.",
    line: "Language models read ASCII layouts well but struggle to write them. Training them to construct layouts from text improves spatial reasoning, and the gains transfer to three external benchmarks.",
    links: [["Project page", "https://aiea-lab.github.io/Text2Space/"], ["arXiv", "https://arxiv.org/abs/2604.14641"], ["Dataset", "https://huggingface.co/datasets/ShiyuanHuang/Text2Space"]] },
  { slug: "right-this-way", theme: "spa", pub: "Right This Way", name: "Right This Way", img: "rtw", venue: "NeurIPS 2024", short: "Vision-language models that say how to adjust an image to answer.",
    line: "A benchmark and a synthetic data framework that teach vision-language models to say how to adjust an image when it cannot answer the question, a common need for visually impaired users.",
    links: [["Paper", "https://proceedings.neurips.cc/paper_files/paper/2024/file/efe4e50d492fedc0dfd2959f3320a974-Paper-Conference.pdf"], ["Code", "https://github.com/LeoLee7/Directional_guidance"]] },
  { slug: "tactile-annotation", theme: "acc", pub: "From Anonymous", name: "Tactile Map Annotation", img: "2608.23820", venue: "ASSETS 2026 Demo", short: "Braille and place labels for 3D-printed tactile maps.",
    line: "A web tool that lets a sighted helper add Braille and place labels to a generated 3D-printed tactile map, so each footprint can be identified by touch.",
    links: [["arXiv", "https://arxiv.org/abs/2608.23820"], ["Demo", "https://leolee7.github.io/Annotate_Braille/"]] },
  { slug: "pattern-insights", theme: "hai", pub: "Pattern Discovery", name: "Pattern Insights Explorer", img: "www", venue: "WWW 2026 Demo, Amazon",
    line: "A modular framework that pairs wide-lens views of where candidate patterns cluster with sharp-focus checks of whether they are meaningful, for unlabeled data without ground truth.",
    links: [["Paper", "https://doi.org/10.1145/3774905.3793105"]] },
  { slug: "hai-survey", theme: "hai", pub: "A Survey on Human-AI", name: "Human-AI Collaboration Survey", img: "tist", figs: [["tist-lifecycle", "The lifecycle of human-AI collaboration with large foundation models, as organized in the survey."]], venue: "ACM TIST 2026",
    short: "How people and large foundation models work together, from model building to deployment.",
    line: "A survey of human-AI collaboration with large foundation models, covering human-guided model development, collaboration patterns, governance, and high-stakes applications.",
    links: [["Paper", "https://doi.org/10.1145/3841472"]] },
  { slug: "enose", theme: "hea", pubs: ["CPSC", "Boost AI", "Classifying Herbal"], name: "Conformal Prediction for Electronic Noses", img: "enose", venue: "IEEE TIM 2022, IEEE Sensors Journal 2021",
    short: "Reliable predictions for e-nose sensing with little labeled data.",
    line: "Conformal prediction methods that attach a reliability estimate to each electronic-nose prediction and use it to learn from unlabeled data.",
    links: [] },
  { slug: "biosignals", theme: "hea", pubs: ["Unsupervised Cross-User", "Basic Taste", "Bimodal Fusion", "Quantitatively Recognizing", "Silent Speech"], name: "Biosignal Sensing for Taste and Speech", venue: "IEEE TIM, ICASSP, Sensors, 2021 to 2023",
    short: "Recognizing taste and silent speech from EMG and EEG.",
    line: "Models that recognize taste sensations and silent speech from surface electromyography and electroencephalography.",
    links: [] },
  { slug: "trilight", theme: "hea", pub: "A Tri-Light", name: "Tri-Light Warning System", img: "trilight", venue: "EJR Open 2024",
    short: "Credibility-based risk stratification for hospitalized COVID-19 patients.",
    line: "A conformal-prediction warning system that sorts hospitalized COVID-19 patients into high, uncertain, and low risk from CT and clinical data.",
    links: [["Paper", "https://www.sciencedirect.com/science/article/pii/S2352047724000583"]] },
  { slug: "swinmm", theme: "hea", pub: "SwinMM", name: "SwinMM", img: "swinmm", venue: "MICCAI 2023",
    short: "Self-supervised multi-view pre-training for 3D medical image segmentation.",
    line: "Masked multi-view pre-training with Swin Transformers for accurate and data-efficient 3D medical image segmentation.",
    links: [["arXiv", "https://arxiv.org/abs/2307.12591"], ["Code", "https://github.com/UCSC-VLAA/SwinMM"]] },
  { slug: "lotus-pavilion", theme: "make", name: "Lotus Pavilion", img: "lotus-07", cover: 1, venue: "Undergraduate design, Zhejiang University",
    short: "A light-responsive pavilion inspired by the lotus on West Lake.",
    line: "A light-responsive pavilion inspired by West Lake in Hangzhou, built from modular units that open to sunlight like lotus petals.",
    figs: [["lotus-01", "West Lake, Hangzhou, the site that inspired the design."], ["lotus-02", "Lotus leaves on the lake."],
      ["lotus-03", "Form studies: from the lotus leaf to a hexagonal module."], ["lotus-04", "A lotus opening, the motion each unit imitates."],
      ["lotus-05", "The light-responsive unit: section drawing and the built prototype."], ["lotus-06", "Generating the canopy form in eight steps."],
      ["lotus-08", "Rendering of the pavilion by the lake."]],
    links: [["Video", "https://www.youtube.com/watch?v=9G6kR8N1WFM"]] },
  { theme: "make", name: "Art", art: "09", venue: "Painting, photography, and visual design",
    line: "Seascape and pet paintings, photographs, and digital illustration." },
];

export const OVERVIEW_EARLY = {
  "enose": [
    "Electronic noses can tell herbal medicines apart, but supervised models need labeled samples that are slow and costly to collect, and they give no measure of how reliable each prediction is. This line of work, co-led with Xianghao Zhan at Zhejiang University, uses conformal prediction to quantify that reliability and to put unlabeled data to work.",
    "Boost AI Power compares five data augmentation strategies under scarce training data and simulated sensor drift, including a new ensemble inductive conformal prediction (EICP) online learning method. CPSC, conformal prediction with shrunken centroids, regularizes class centroids to suppress irrelevant features, addressing the variance, bias, and computational cost of k-nearest-neighbor conformal prediction as feature dimensionality grows. It is evaluated both offline and in online learning where reliability decides which unlabeled samples join the training set.",
    "A companion study compares manual feature extraction, mathematical transformations, and deep learning for distinguishing the geographic origins of herbal medicines, whose odor fingerprints differ only slightly."],
  "biosignals": [
    "With collaborators at Zhejiang University, I worked on recognizing taste sensations and silent speech from physiological signals. Surface electromyography (sEMG) records muscle activity and electroencephalography (EEG) records brain activity in response to taste stimuli or articulation.",
    "We adapted sEMG taste models across users with domain regularized component analysis and conformal prediction with shrunken centroids (co-first author), recognized six basic taste sensations from EEG with a multi-scale residual network (EEG-MSRNet), fused EEG and EMG in a bimodal network (Bi-FusionNet), and regressed the intensity of primary tastes from sEMG. A Mandarin silent speech interface converts sEMG from silent speakers into audio with help from paired data of vocal speakers, reaching an average character error rate of 10.69% across four silent speakers."],
  "trilight": [
    "COVID-19 kept spreading and mutating, and hospitals needed a way to stratify patients by risk to allocate medical resources. We developed a conformal-prediction-based tri-light warning system that applies to both the original strain and emerging variants.",
    "The system extracts radiomic features from chest CT, combines them with clinical records, and sorts patients into high-risk (red), uncertain-risk (yellow), and low-risk (green) groups for ICU admission. Built on data from 3,646 patients across multiple centers in China, it held up under data distribution shifts, with an AUROC of 0.89 for the original strains and 0.77 to 0.85 for the Delta and Omicron variants."],
  "swinmm": [
    "Large Vision Transformers have improved pre-trained models for medical image segmentation, but they need large amounts of pre-training data, which are scarce in medicine. SwinMM, Masked Multi-view with Swin Transformers, uses multiple views of 3D medical data for accurate and data-efficient self-supervised learning.",
    "In pre-training, a masked multi-view encoder learns from several proxy tasks: image reconstruction, rotation, contrastive learning, and a mutual learning task that exploits the consistency between predictions from different views. In fine-tuning, a cross-view decoder aggregates the views with cross-attention. SwinMM outperforms the previous state-of-the-art self-supervised method, Swin UNETR, on several medical image segmentation tasks."],
};

export const OVERVIEW = {
  "lotus-pavilion": [
    "A light-responsive pavilion I designed during my undergraduate study at Zhejiang University. It takes its cue from the lotus on West Lake in Hangzhou: the canopy is a field of hexagonal modules, and each module adapts to sunlight and mimics the petals of a lotus.",
    "The design grew from form studies of lotus leaves and flowers. I built a working prototype of the responsive unit and developed the canopy form step by step from a single leaf-like surface."],
  "hai-survey": [
    "Large foundation models greatly expand what people and AI systems can achieve together, but realizing that potential responsibly requires addressing persistent challenges in safety, fairness, and control. This survey reviews human-AI collaboration with large foundation models along four lines: human-guided model development, design principles for collaboration, ethical and governance frameworks, and applications in high-stakes domains.",
    "At run time, it organizes collaboration into recurring patterns: human-steered AI, AI-augmented human work, mixed-initiative interaction, control handoff and delegation, and supervisory orchestration of agentic systems, a newer mode in which people monitor, guide, and intervene in multi-step AI workflows. The review finds that successful collaboration is not the automatic result of stronger models but the product of careful, human-centered design."],
  "touchingspace": [
    "Accessible map systems either make a layout explorable by hand or convey information through speech, and few combine both to support pre-travel spatial understanding for blind and low-vision (BLV) people. TouchingSpace retrieves map data for an outdoor place and renders its surroundings as bounded regions at fixed positions on a laptop trackpad. While exploring, people receive audio and haptic feedback and can ask a conversational agent open-ended questions.",
    "In a study with fourteen BLV participants, people used sound and vibration to locate places and speech to identify and describe them. The bounded surface supported discovery, revision, and spatial checks by hand, and participants expected this awareness to support future travel."],
  "ascii": [
    "People sketch layouts to organize their thinking about space. We asked whether learning to build explicit layouts from spatial descriptions can give language models real spatial understanding.",
    "We introduce Text2Space, a dataset that pairs text descriptions with ASCII grid layouts, and find a read-write asymmetry: models read ASCII layouts well but struggle to construct them from text. Training on layout construction improves spatial reasoning from text alone, and the gains transfer to three external benchmarks."],
  "right-this-way": [
    "In visual question answering, people judge whether the available information is enough and look for more when it is not, while vision-language models usually answer in one shot. We ask whether VLMs can indicate how to adjust an image when the visual information is insufficient, a capability that matters for visually impaired people who need guidance to capture images.",
    "We release a human-labeled benchmark for this directional guidance task and a framework that generates synthetic training data by simulating \u201cwhere to know\u201d scenarios. Fine-tuning on this data significantly improves mainstream VLMs."],
  "tactile-annotation": [
    "On a 3D-printed tactile map, a building felt under the finger is an anonymous shape. Touch alone cannot tell which footprint is which, and a spoken description cannot reliably tie a shape to a specific place.",
    "We built a web-based tool that lets a sighted helper add Braille and place labels to a generated map model. Labeling happens after geometry generation, so the person doing it can account for the reader and the local Braille standard."],
  "pattern-insights": [
    "Discovering patterns in unfamiliar text is circular: extraction needs a taxonomy, but the taxonomy needs the patterns, and there are no ground-truth labels to resolve it. Pattern Insights Explorer alternates between a wide-lens view of where candidate patterns cluster and a sharp-focus check of whether each pattern is extracted correctly.",
    "I built it during my 2025 Applied Scientist internship at Amazon with Omar Alonso and Giorgio Ballardin. The framework grows a validated taxonomy over unlabeled conversation logs from a few seed keywords, with every pattern traceable to its source, and was demonstrated on 5,000 customer-service conversations."],
};

export const NEWS = [
  { slug: "pitchability-2026", rel: ["touchingspace"], d: "Sep 2026", img: "pitch",
    title: "Presenting TouchingSpace at PitchAbility 2026",
    h: "Presented TouchingSpace and our 3D-printed tactile maps with the AIEA Lab at PitchAbility 2026, Vista Center's international pitch competition for assistive technology.",
    body: [
      "Our AIEA Lab team presented TouchingSpace and our 3D-printed tactile maps at the Exhibit & Demo Hall of PitchAbility 2026, the international pitch competition hosted by Vista Center for the Blind and Visually Impaired.",
      "PitchAbility drew applicants from more than 8 countries, and more than 35 companies exhibited assistive technology for people who are blind, have low vision, or are DeafBlind. Vista Center's recap of the event, sent to more than 6,000 people, listed the AIEA Lab among the exhibitors.",
      "At our table we showed TouchingSpace, which turns an outdoor place into an audio-haptic map on an everyday laptop trackpad, next to the 3D-printed tactile maps from our Braille annotation work.",
    ],
    imgs: [["pitch", "The AIEA Lab team at our exhibit table."], ["hall", "The Exhibit & Demo Hall at PitchAbility 2026. Photo: Vista Center."]],
    extra: "pitchability",
    facts: [["Event", "PitchAbility 2026"], ["Host", "Vista Center for the Blind and Visually Impaired"], ["Where we were", "Exhibit & Demo Hall"]],
    links: [["Event page", "https://vistacenter.org/pitchability-vista-international-pitch-competition-2026/"]] },
  { slug: "amazon-2026", d: "Sep 2026",
    title: "Wrapping up my Applied Scientist internship at Amazon",
    h: "Finished my Applied Scientist internship at Amazon in Seattle, working on structured skill engineering for agents.",
    body: [
      "From June to September 2026 I worked as an Applied Scientist Intern at Amazon in Seattle on structured skill engineering for agents.",
      "I encoded free-text SKILL.md prompts as typed, versioned graphs of each skill's solution approach and key steps. The same graph serves as documentation for people and as executable instructions for agents, and it cut agent output tokens by about 50% at equal or better task performance.",
      "I also linked each skill to its evidence and rollouts, so that every failure can be traced to the agent, the task, or the benchmark. This surfaced defects in the benchmarks themselves.",
    ], imgs: [], links: [], facts: [["Role", "Applied Scientist Intern"], ["Location", "Seattle, WA, USA"], ["Dates", "June to Sept. 2026"], ["Focus", "Structured skill engineering for agents"]] },
  { slug: "touchingspace-preprint", to: "touchingspace", d: "Sep 2026", img: "2609.36404",
    title: "New preprint: TouchingSpace",
    h: "New preprint on <a href='#news-touchingspace-preprint'>TouchingSpace</a>, an audio-haptic map for blind and low-vision readers.",
    body: [
      "Accessible map systems either make a layout explorable by hand or convey information through speech, and few combine both to support pre-travel spatial understanding for blind and low-vision (BLV) people. TouchingSpace retrieves map data for an outdoor place and renders its surroundings as bounded regions at fixed positions on a laptop trackpad. While exploring, people receive audio and haptic feedback and can ask a conversational agent open-ended questions.",
      "In a study with fourteen BLV participants, people used sound and vibration to locate places and speech to identify and describe them. The bounded surface supported discovery, revision, and spatial checks by hand, and participants expected this awareness to support future travel.",
    ],
    imgs: [["2609.36404", "TouchingSpace overview."]],
    links: [["arXiv", "https://arxiv.org/abs/2609.36404"], ["Demo video", "https://youtu.be/t3qaVIrDDa4"], ["Phase 1 on arXiv", "https://arxiv.org/abs/2604.14637"]] },
  { slug: "tist-2026", to: "hai-survey", d: "Sep 2026", img: "tist",
    title: "Survey on human-AI collaboration published in ACM TIST",
    h: "Our survey <a href='#news-tist-2026'>A Survey on Human-AI Collaboration with Large Foundation Models</a> is published in ACM Transactions on Intelligent Systems and Technology.",
    body: [
      "The survey reviews how people and large foundation models work together, from human-guided model development and collaboration patterns to governance and high-stakes applications. It finds that successful human-AI systems are not the automatic result of stronger models but the product of careful, human-centered design.",
    ],
    imgs: [["tist", "Collaboration patterns and role allocation."]],
    links: [["Paper", "https://doi.org/10.1145/3841472"]] },
  { slug: "assets-2026", to: "tactile-annotation", d: "Aug 2026", img: "2608.23820",
    title: "Braille annotation tool accepted to ASSETS 2026",
    h: "Our Braille annotation tool for tactile maps is accepted to the ASSETS 2026 Posters and Demonstrations track.",
    body: [
      "On a 3D-printed tactile map, a building felt under the finger is an anonymous shape. Touch alone cannot tell which footprint is which, and a spoken description cannot reliably tie a shape to a specific place.",
      "We built a web-based tool that lets a sighted helper add Braille and place labels to a generated map model. Labeling happens after geometry generation, so the person doing it can account for the reader and the local Braille standard. The work appears in the ASSETS 2026 Posters and Demonstrations track.",
    ],
    imgs: [["2608.23820", "Tactile maps and the annotation tool."]],
    links: [["arXiv", "https://arxiv.org/abs/2608.23820"], ["Try the tool", "https://leolee7.github.io/Annotate_Braille/"]] },
  { slug: "colm-2026", to: "ascii", d: "2026", img: "colm",
    title: "Learning to Draw ASCII accepted to COLM 2026",
    h: "<a href='#news-colm-2026'>Learning to Draw ASCII Improves Spatial Reasoning in Language Models</a> is accepted to COLM 2026.",
    body: [
      "People sketch layouts to organize their thinking about space. We asked whether learning to build explicit layouts from spatial descriptions can give language models real spatial understanding.",
      "We introduce Text2Space, a dataset that pairs text descriptions with ASCII grid layouts, and find a read-write asymmetry: models read ASCII layouts well but struggle to construct them from text. Training on layout construction improves spatial reasoning from text alone, and the gains transfer to three external benchmarks. This is joint work with Shiyuan Huang (co-first author), Jincheng He, and Leilani H. Gilpin.",
    ],
    imgs: [["colm", "Our COLM 2026 poster."]],
    links: [["Project page", "https://aiea-lab.github.io/Text2Space/"], ["arXiv", "https://arxiv.org/abs/2604.14641"], ["Dataset", "https://huggingface.co/datasets/ShiyuanHuang/Text2Space"]] },
  { slug: "www-2026", to: "pattern-insights", d: "Jul 2026", img: "www",
    title: "Pattern Insights Explorer at the WWW 2026 Demo Track",
    h: "Presented <a href='#news-www-2026'>Pattern Insights Explorer</a> at the WWW 2026 Demo Track.",
    body: [
      "Discovering patterns in unfamiliar text is circular: extraction needs a taxonomy, but the taxonomy needs the patterns, and there are no ground-truth labels to resolve it. Pattern Insights Explorer alternates between a wide-lens view of where candidate patterns cluster and a sharp-focus check of whether each pattern is extracted correctly.",
      "I built the demo during my 2025 internship at Amazon, with Omar Alonso and Giorgio Ballardin. It runs on 5,000 customer-service conversations and was presented at the WWW 2026 Posters and Demos session.",
    ],
    imgs: [["www", "Our WWW 2026 demo poster."]],
    links: [["Paper", "https://doi.org/10.1145/3774905.3793105"]] },
  { slug: "preprints-apr-2026", inline: 1, rel: ["ascii", "touchingspace"], d: "Apr 2026",
    title: "Two new preprints",
    h: "Released two preprints, on <a href='#project-ascii'>ASCII spatial reasoning</a> and the first phase of <a href='#project-touchingspace'>TouchingSpace</a>.",
    body: [
      "Learning to Draw ASCII Improves Spatial Reasoning in Language Models shows that training language models to construct ASCII layouts from text improves their spatial reasoning.",
      "Touching Space: Accessible Map Exploration Through Conversational Audio-Haptic Interaction is the first phase of TouchingSpace, focused on helping blind and low-vision people build a cognitive map of an unfamiliar place before travel.",
    ],
    imgs: [], links: [["ASCII on arXiv", "https://arxiv.org/abs/2604.14641"], ["Touching Space on arXiv", "https://arxiv.org/abs/2604.14637"]] },
  { slug: "amazon-2025", rel: ["pattern-insights"], d: "Sep 2025",
    title: "Finished my 2025 internship at Amazon",
    h: "Finished my Applied Scientist internship at Amazon on human-in-the-loop pattern discovery.",
    body: [
      "From June to September 2025 I worked as an Applied Scientist Intern at Amazon in Santa Clara. I developed a human-in-the-loop framework that grows a validated taxonomy over large unlabeled conversation logs from a few seed keywords, with every pattern traceable to its source.",
      "The work became Pattern Insights Explorer, presented at the WWW 2026 Demo Track.",
    ], imgs: [], links: [], facts: [["Role", "Applied Scientist Intern"], ["Location", "Santa Clara, CA, USA"], ["Dates", "June to Sept. 2025"], ["Outcome", "WWW 2026 demo paper"]] },
];

export const EXPERIENCE = [
  { logo: "amazon", org: "Amazon", role: "Applied Scientist Intern", place: "Seattle, WA", y: "2026", dates: "June to Sept. 2026", t0: 2026.42, t1: 2026.67, topic: "Typed Meta-Skills, structured skill engineering for agents", bullets: [
    "<b>Typed Meta-Skills, structured skill engineering for agents.</b> Encoded free-text SKILL.md prompts as typed, versioned graphs of each skill's solution approach and key steps, serving as documentation for people and executable instructions for agents. Cut agent output tokens by about 50% at equal or better task performance.",
    "<b>Pipeline-wide failure attribution.</b> Linked each skill to its evidence and rollouts so each failure traces to the agent, the task, or the benchmark, surfacing benchmark defects."] },
  { logo: "amazon", org: "Amazon", role: "Applied Scientist Intern", place: "Santa Clara, CA", y: "2025", dates: "June to Sept. 2025", t0: 2025.42, t1: 2025.67, topic: "Taxonomy discovery from unlabeled conversations (WWW 2026)", bullets: [
    "<b>Taxonomy discovery from unlabeled conversations (WWW 2026).</b> Developed a human-in-the-loop framework that grows a validated taxonomy over large unlabeled conversation logs from a few seed keywords, with every pattern traceable to its source. Demonstrated on 5,000 customer-service conversations."] },
  { logo: "amazon", org: "Amazon", role: "Applied Scientist Intern", place: "Palo Alto, CA", y: "2024", dates: "June to Sept. 2024", t0: 2024.42, t1: 2024.67, topic: "Evidence-grounded recommendation", bullets: [
    "<b>Evidence-grounded recommendation.</b> Built a retrieval-augmented recommender for subjective product queries that cites the user-generated content supporting each suggestion."] },
  { logo: "nissan", org: "Nissan Research Center", role: "Data Scientist Intern", place: "Santa Clara, CA", y: "2023", dates: "July to Sept. 2023", t0: 2023.5, t1: 2023.67, topic: "Driver engagement in autonomous driving", bullets: [
    "<b>Driver engagement in autonomous driving.</b> Developed a time-series model of driver engagement from real-world driving logs, improving prediction accuracy by 16%."] },
];

export const EDUCATION = [
  { logo: "ucsc", org: "University of California, Santa Cruz", role: "Ph.D. in Computer Science and Engineering", sub: "Advisor: Leilani H. Gilpin", y: "2022 to 2027 (expected)" },
  { logo: "zju", org: "Zhejiang University", role: "M.Eng. in Control Science and Engineering", y: "2019 to 2022" },
  { logo: "zju", org: "Zhejiang University", role: "B.S., Chu Kochen Honors College", y: "2015 to 2019" },
];

/* Projects page sections, in display order */
export const THEMES = [
  ["spa", "Spatial reasoning", "Teaching language and vision-language models to understand space."],
  ["acc", "Accessible spatial interaction", "Maps and tools that blind and low-vision people explore by touch, sound, and conversation."],
  ["hai", "Human-agent collaboration", "Systems and surveys on people and AI working together."],
  ["hea", "Health and sensing", "Reliable models for clinical imaging, biosignals, and electronic noses."],
  ["make", "Design and making", "Things I designed and built by hand."],
];

export const GROUPS = [
  ["spa", "Spatial reasoning", "Benchmarks and training methods for spatial understanding in language and vision-language models."],
  ["acc", "Accessibility", "Audio-haptic and tactile systems that help blind and low-vision people understand places."],
  ["hai", "Human-agent collaboration", "Human-in-the-loop systems and surveys on people working with AI."],
  ["tml", "Trustworthy ML", "Conformal prediction and robust training for reliable predictions."],
  ["hea", "Health and sensing", "Models for clinical, physiological, and electronic-nose sensor data."],
];

export const PRIMARY = [["Learning to Draw", "spa"], ["Right This Way", "spa"], ["From Anonymous", "acc"], ["“I didn", "acc"], ["Touching Space", "acc"],
  ["Pattern Discovery", "hai"], ["A Survey on Human-AI", "hai"], ["CPSC", "tml"], ["Bag of Tricks", "tml"], ["Boost AI", "tml"]];

export const EDU_THEME = [
  { logo: "zju", deg: `B.S., Chu Kochen Honors College, Zhejiang University`, org: "2015 to 2019", theme: "Spatial interaction" },
  { logo: "zju", deg: `M.Eng., Control Science and Engineering, Zhejiang University`, org: "2019 to 2022", theme: "Biosensors" },
  { logo: "ucsc", deg: `Ph.D., Computer Science and Engineering, UC Santa Cruz`, org: "Advised by Leilani H. Gilpin, Sep 2022 to May 2027", theme: "Spatial reasoning and human-agent collaboration" },
];

export const VIDEOS = { touchingspace: { id: "t3qaVIrDDa4", thumb: "yt_ts" }, "lotus-pavilion": { id: "9G6kR8N1WFM", thumb: "yt_lotus" } };

export const PUBS = [
  { img: "colm", y: 2026, v: "COLM", vy: "2026", top: 1, sel: 1, first: 1, tags: ["spa","llm"],
    t: "Learning to Draw ASCII Improves Spatial Reasoning in Language Models",
    a: "Shiyuan Huang*, Li Liu*, Jincheng He, Leilani H. Gilpin",
    l: [["Project page","https://aiea-lab.github.io/Text2Space/"],["arXiv","https://arxiv.org/abs/2604.14641"],["Dataset","https://huggingface.co/datasets/ShiyuanHuang/Text2Space"]] },
  { img: "2608.23820", y: 2026, v: "ASSETS", vy: "2026 Demo", top: 1, sel: 1, first: 1, tags: ["acc"],
    t: "From Anonymous Shapes to Named Places: A Tool for Braille and Place-Semantic Annotation of Tactile Maps",
    a: "Li Liu, Ashmita Dua, Jiaming Qu, David T. Lee, Leilani H. Gilpin",
    l: [["arXiv","https://arxiv.org/abs/2608.23820"],["Demo","https://leolee7.github.io/Annotate_Braille/"]] },
  { img: "www", y: 2026, v: "WWW", vy: "2026 Demo", top: 1, sel: 1, first: 1, tags: ["hai"],
    t: "Pattern Discovery with Wide-Lens Analysis and Sharp-Focus Validation",
    a: "Li Liu, Omar Alonso, Giorgio Ballardin",
    l: [["Paper","https://doi.org/10.1145/3774905.3793105"]] },
  { img: "ts_overview", y: 2026, v: "arXiv", vy: "2026", sel: 1, first: 1, tags: ["acc","hai","spa"],
    t: "“I didn’t know how to read a map, but now I can”: TouchingSpace, an Audio-Haptic Map for Blind and Low-Vision Readers",
    a: "Li Liu, Yihe Wang, Jiaming Qu, Ashmita Dua, David T. Lee, Leilani H. Gilpin",
    l: [["arXiv","https://arxiv.org/abs/2609.36404"],["Video","https://youtu.be/t3qaVIrDDa4"]],
    phase1: { t: "Touching Space: Accessible Map Exploration Through Conversational Audio-Haptic Interaction", a: "Li Liu, Jiaming Qu, Marc Jowell Bagaoisan, David T. Lee, Leilani H. Gilpin", y: 2026, u: "https://arxiv.org/abs/2604.14637" } },
  { img: "rtw", y: 2024, v: "NeurIPS", vy: "2024", top: 1, sel: 1, first: 1, tags: ["acc","llm","spa"],
    t: "Right This Way: Can VLMs Guide Us to See More to Answer Questions?",
    a: "Li Liu*, Diji Yang*, Sijia Zhong, Kalyana Suma Sree Tholeti, Lei Ding, Yi Zhang, Leilani H. Gilpin",
    arx: "2411.00394", l: [["Paper","https://proceedings.neurips.cc/paper_files/paper/2024/file/efe4e50d492fedc0dfd2959f3320a974-Paper-Conference.pdf"],["Code","https://github.com/LeoLee7/Directional_guidance"]] },
  { arx: "oa-covid", y: 2024, v: "EJR Open", vy: "2024", img: "trilight", tags: ["hea","tml"],
    t: "A Tri-Light Warning System for Hospitalized COVID-19 Patients: Credibility-Based Risk Stratification for Future Pandemic Preparedness",
    a: "Chuanjun Xu, Qinmei Xu, Li Liu, Mu Zhou, Zijian Xing, Zhen Zhou, Danyang Ren, Changsheng Zhou, Longjiang Zhang, Xiao Li, Xianghao Zhan, Olivier Gevaert, Guangming Lu",
    l: [["Paper","https://www.sciencedirect.com/science/article/pii/S2352047724000583"]] },
  { arx: "oa-tist", y: 2026, v: "ACM TIST", vy: "2026", img: "tist", tags: ["hai","llm"],
    t: "A Survey on Human-AI Collaboration with Large Foundation Models",
    a: "Vanshika Vats*, Marzia Binta Nizam*, Minghao Liu, Ziyuan Wang, Richard Ho, Mohnish Sai Prasad, Vincent Titterton, Sai Venkat Malreddy, Riya Aggarwal, Yanwen Xu, Lei Ding, Jay Mehta, Nathan Grinnell, Li Liu, Sijia Zhong, Devanathan Nallur Gandamani, Xinyi Tang, Rohan Ghosalkar, Celeste Shen, Rachel Shen, Nafisa Hussain, Kesav Ravichandran, James Davis",
    l: [["Paper","https://doi.org/10.1145/3841472"]] },
  { img: "swinmm", y: 2023, v: "MICCAI", vy: "2023", top: 1, tags: ["hea"],
    t: "SwinMM: Masked Multi-view with Swin Transformers for 3D Medical Image Segmentation",
    a: "Yiqing Wang, Zihan Li, Zihao Wei, Jieru Mei, Li Liu, Chen Wang, Shengtian Sang, Alan Yuille, Cihang Xie, Yuyin Zhou",
    l: [["arXiv","https://arxiv.org/abs/2307.12591"],["Code","https://github.com/UCSC-VLAA/SwinMM"]] },
  { arx: "oa-bimodal", y: 2023, v: "ICASSP", vy: "2023", tags: ["hea"],
    t: "Bimodal Fusion Network for Basic Taste Sensation Recognition from Electroencephalography and Electromyography",
    a: "Han Gao, Shuo Zhao, Huiyan Li, Li Liu, You Wang, Ruifen Hu, Jin Zhang, Guang Li",
    l: [["IEEE","https://ieeexplore.ieee.org/document/10095117"]] },
  { arx: "oa-eeg", y: 2023, v: "IEEE TIM", vy: "2023", tags: ["hea"],
    t: "Basic Taste Sensation Recognition from EEG Based on Multi-Scale Convolutional Neural Network with Residual Learning",
    a: "Han Gao, Shuo Zhao, Huiyan Li, Li Liu, Hengyang Wang, You Wang, Zhiyuan Luo, Jin Zhang, Guang Li",
    l: [["IEEE","https://ieeexplore.ieee.org/abstract/document/10138514/"]] },
  { arx: "oa-silent", y: 2023, v: "IEEE TIM", vy: "2023", tags: ["hea"],
    t: "Silent Speech Interface with Vocal Speaker Assistance Based on Convolution-augmented Transformer",
    a: "Huiyan Li, Yihao Liang, Han Gao, Li Liu, You Wang, Daqi Chen, Zhiyuan Luo, Guang Li",
    l: [["IEEE","https://ieeexplore.ieee.org/document/10121584"]] },
  { arx: "oa-cpsc", y: 2022, v: "IEEE TIM", vy: "2022", first: 1, tags: ["tml","hea"],
    t: "CPSC: Conformal Prediction With Shrunken Centroids for Efficient Prediction Reliability Quantification and Data Augmentation, a Case in Alternative Herbal Medicine Classification With Electronic Nose",
    a: "Li Liu*, Xianghao Zhan*, Xikai Yang*, Xiaoqing Guan, Rumeng Wu, Zhan Wang, Zhiyuan Luo, You Wang, Guang Li",
    l: [["IEEE","https://ieeexplore.ieee.org/abstract/document/9667498"]] },
  { arx: "oa-xuser", y: 2022, v: "IEEE TIM", vy: "2022", first: 1, tags: ["tml","hea"],
    t: "Unsupervised Cross-User Adaptation in Taste Sensation Recognition Based on Surface Electromyography with Conformal Prediction and Domain Regularized Component Analysis",
    a: "Hengyang Wang*, Xianghao Zhan*, Li Liu*, Asif Ullah, Huiyan Li, Han Gao, You Wang, Ruifen Hu, Guang Li",
    l: [["IEEE","https://ieeexplore.ieee.org/document/9777907"]] },
  { y: 2022, v: "arXiv", vy: "2022", tags: ["tml"],
    t: "Bag of Tricks for FGSM Adversarial Training",
    a: "Zichao Li, Li Liu, Zeyu Wang, Yuyin Zhou, Cihang Xie",
    l: [["arXiv","https://arxiv.org/abs/2209.02684"]] },
  { arx: "oa-boost", y: 2021, v: "IEEE Sensors", vy: "2021", first: 1, tags: ["tml","hea"],
    t: "Boost AI Power: Data Augmentation Strategies With Unlabeled Data and Conformal Prediction, a Case in Alternative Herbal Medicine Discrimination With Electronic Nose",
    a: "Li Liu*, Xianghao Zhan*, Rumeng Wu, Xiaoqing Guan, Zhan Wang, Wei Zhang, Mert Pilanci, You Wang, Zhiyuan Luo, Guang Li",
    l: [["IEEE","https://ieeexplore.ieee.org/abstract/document/9505688"]] },
  { y: 2021, v: "arXiv", vy: "2021", first: 1, tags: ["hea"],
    t: "Classifying Herbal Medicine Origins by Temporal and Spectral Data Mining of Electronic Nose",
    a: "Li Liu*, Xianghao Zhan*, Ziheng Duan*, Yi Wu, Rumeng Wu, Xiaoqing Guan, Zhan Wang, You Wang, Guang Li",
    l: [["arXiv","https://arxiv.org/abs/2104.06640"]] },
  { arx: "oa-intensity", y: 2021, v: "Sensors", vy: "2021", tags: ["hea"],
    t: "Quantitatively Recognizing Stimuli Intensity of Primary Taste Based on Surface Electromyography",
    a: "Hengyang Wang, Dongcheng Lu, Li Liu, Han Gao, Rumeng Wu, Yueling Zhou, Qing Ai, You Wang, Guang Li",
    l: [["MDPI","https://www.mdpi.com/1424-8220/21/21/6965"]] },
];

export const AVATAR = "assets/img/avatar.jpg";
export const TEASERS = {
 "lotus-01": { "a": "assets/img/design/lotus-01.jpg" },
 "lotus-02": { "a": "assets/img/design/lotus-02.jpg" },
 "lotus-03": { "a": "assets/img/design/lotus-03.jpg" },
 "lotus-04": { "a": "assets/img/design/lotus-04.jpg" },
 "lotus-05": { "a": "assets/img/design/lotus-05.jpg" },
 "lotus-06": { "a": "assets/img/design/lotus-06.jpg" },
 "lotus-07": { "a": "assets/img/design/lotus-07.jpg" },
 "lotus-08": { "a": "assets/img/design/lotus-08.jpg" },
 "yt_lotus": { "a": "assets/img/video/lotus.jpg" },
 "tist": { "a": "assets/img/papers/tist.jpg", "full": "assets/img/full/tist.png" },
 "tist-lifecycle": { "a": "assets/img/papers/tist-lifecycle.jpg", "full": "assets/img/full/tist-lifecycle.png" },
 "trilight": { "a": "assets/img/papers/trilight.jpg", "full": "assets/img/full/trilight.png" },
 "2604.14641": {
  "a": "assets/img/papers/2604.14641.jpg",
  "full": "assets/img/full/2604.14641.png"
 },
 "2608.23820": {
  "a": "assets/img/papers/2608.23820.jpg",
  "full": "assets/img/full/2608.23820.jpg"
 },
 "2609.36404": {
  "a": "assets/img/papers/2609.36404.jpg",
  "full": "assets/img/full/2609.36404.png"
 },
 "2604.14637": {
  "a": "assets/img/papers/2604.14637.jpg",
  "full": "assets/img/full/2604.14637.png"
 },
 "2411.00394": {
  "a": "assets/img/papers/2411.00394.jpg",
  "full": "assets/img/full/2411.00394.png"
 },
 "colm": {
  "a": "assets/img/posters/colm.jpg",
  "full": "assets/img/full/colm.png"
 },
 "rtw": {
  "a": "assets/img/posters/rtw.jpg",
  "full": "assets/img/full/rtw.png"
 },
 "www": {
  "a": "assets/img/posters/www.jpg",
  "full": "assets/img/full/www.jpg"
 },
 "pitch": {
  "a": "assets/img/news/pitchability-team.jpg",
  "full": "assets/img/full/pitchability-team.jpg"
 },
 "hall": {
  "a": "assets/img/news/pitchability-hall.jpg",
  "full": "assets/img/full/pitchability-hall.jpg"
 },
 "yt_ts": {
  "a": "assets/img/video/touchingspace.jpg"
 },
 "enose": {
  "a": "assets/img/papers/enose.jpg",
  "full": "assets/img/full/enose.png"
 },
 "swinmm": {
  "a": "assets/img/papers/swinmm.jpg",
  "full": "assets/img/full/swinmm.png"
 },
 "ts_overview": {
  "a": "assets/img/papers/ts-overview.jpg",
  "full": "assets/img/full/ts-overview.png"
 }
};
export const ART = {
 "01": "assets/img/art/01.jpg",
 "02": "assets/img/art/02.jpg",
 "03": "assets/img/art/03.jpg",
 "04": "assets/img/art/04.jpg",
 "05": "assets/img/art/05.jpg",
 "06": "assets/img/art/06.jpg",
 "07": "assets/img/art/07.jpg",
 "08": "assets/img/art/08.jpg",
 "09": "assets/img/art/09.jpg",
 "10": "assets/img/art/10.jpg",
 "11": "assets/img/art/11.jpg",
 "12": "assets/img/art/12.jpg"
};
export const LOGOS = {
 "amazon": "assets/img/logos/amazon.png",
 "nissan": "assets/img/logos/nissan.png",
 "ucsc": "assets/img/logos/ucsc.png",
 "zju": "assets/img/logos/zju.png"
};
