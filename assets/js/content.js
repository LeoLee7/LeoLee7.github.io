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
  "ACM TIST": "ACM Transactions on Intelligent Systems and Technology", "Under review": "Under review",
};

/* venue weight used to order papers within a topic (lower comes first) */
export const TIER = { "NeurIPS": 1, "COLM": 1, "MICCAI": 2, "ACM TIST": 2, "IEEE TIM": 3, "IEEE Sensors": 3, "ICASSP": 3,
  "WWW": 4, "ASSETS": 4, "EJR Open": 4, "Sensors": 5, "arXiv": 6, "Under review": 6 };

export const TOPICS = [["acc", "Accessibility"], ["spa", "Spatial intelligence"], ["llm", "Language and vision models"], ["hai", "Agents and human-in-the-loop"], ["hea", "Health and sensing"]];

export const SCHOLAR = "https://scholar.google.com/citations?user=hLHzhqkAAAAJ";

/* homepage research highlights, in order */
export const HIGHLIGHTS = ["right-this-way", "ascii", "touchingspace", "skills-on-board"];
/* technical headline per project, shown large on cards and project pages; the project name sits beneath it */
export const HEADLINE = {
  "right-this-way": "Directional Guidance for Vision-Language Models",
  ascii: "Spatial Reasoning in LLMs through Layout Construction",
  touchingspace: "Real-Time Multimodal Agent for Non-Visual Maps",
  "tactile-annotation": "Braille and Semantic Annotation for 3D-Printed Maps",
  "hai-survey": "Human-AI Collaboration with Foundation Models: A Survey",
  "pattern-insights": "Human-in-the-Loop Pattern Discovery in Unlabeled Conversations",
  "skills-on-board": "Agent Skills as Typed, Inspectable Data",
  ser: "Experiential Search over User Reviews",
  swinmm: "Multi-View Self-Supervised Pre-Training for 3D Medical Segmentation",
  cpsc: "Efficient Conformal Prediction with Shrunken Centroids",
  "taste-xuser": "Cross-User sEMG Domain Adaptation",
  "boost-ai": "Data Augmentation for Label-Scarce Electronic Noses",
  fgsm: "Preventing Catastrophic Overfitting in FGSM Adversarial Training",
  "taste-eeg": "Multi-Scale CNN for EEG Taste Recognition",
  "silent-speech": "sEMG-to-Speech Silent Speech Interface",
  "taste-bimodal": "EEG-EMG Fusion for Taste Recognition",
  trilight: "Conformal Risk Triage for COVID-19 from CT",
  "taste-intensity": "Taste Intensity Recognition from Facial sEMG",
  "herbal-origins": "Temporal-Spectral Feature Extraction for Electronic Noses",
  "lotus-pavilion": "Light-Responsive Kinetic Pavilion",
};

/* homepage highlight: two short points per card */
export const HB = {
  "right-this-way": ["VLMs answer even when the image cannot support it.", "Trained them to tell the user how to move the camera for a better view."],
  ascii: ["LLMs read spatial layouts far better than they build them.", "Learning to build layouts improves their spatial reasoning from text alone."],
  touchingspace: ["A real-time sensing loop on a laptop trackpad: an assistive companion tracks the finger, grounds each spoken answer in the map around it, and responds through sound and vibration.", "Built the app from zero and tested it with 14 blind and low-vision users."],
  "skills-on-board": ["Agent skills as typed data that people can trace and edit.", "Edit a step once, and the agent follows."],
};
/* a related development elsewhere, shown after Overview on a project page */
export const ECHO = {
  "right-this-way": { title: "The same question in Gemini Live",
    text: "Happy to see Google ship this capability in Gemini Live. Guided Vision, launched on October&nbsp;1,&nbsp;2026, gives blind and low-vision users spoken cues to pan, tilt, or step back when Gemini needs a better view. It focuses on the same question this paper asked in 2024: what should a model do when the image is not enough?",
    links: [["Google announcement", "https://blog.google/innovation-and-ai/products/gemini-app/guided-vision-gemini-live/"], ["Help Center: Use Guided Vision", "https://support.google.com/accessibility/android/answer/18365638"]] },
};
/* one-line finding shown at the top of a project page */
export const KEY = {
  ascii: "Read-write asymmetry: across six LLMs, accuracy in reading ASCII layouts exceeds accuracy in constructing them from text by 13 to 27 percentage points. Training on construction, rather than comprehension alone, is what improves spatial reasoning.",
  "right-this-way": "Vision-language models answer even when the image cannot support an answer. They can learn instead to tell the user how to move the camera.",
  touchingspace: "Spatial answers anchored at the finger are the most reliable: 96% accuracy on direction and distance from the finger, compared with 49% on relations between two named places.",
  "skills-on-board": "Stable identity, provenance, and deterministic projection are what make an agent skill maintainable.",
};

export const PROJECTS = [
  { slug: "right-this-way", theme: "spa", pub: "Right This Way", name: "Right This Way", img: "rtw", venue: "NeurIPS 2024", short: "VLMs answer even when the image cannot support an answer. We trained them to tell the user how to move the camera, raising the accuracy of open VLMs by up to 16 percentage points. Two years later, Google shipped a similar behavior in Gemini Live.",
    line: "A new task, directional guidance, with an open 821-sample human-labeled benchmark and a label-free synthetic data pipeline. Fine-tuning raises the accuracy of open VLMs by up to 16 percentage points, and the best fine-tuned model exceeds GPT-4o.",
    links: [["Paper", "https://proceedings.neurips.cc/paper_files/paper/2024/file/efe4e50d492fedc0dfd2959f3320a974-Paper-Conference.pdf"], ["Code", "https://github.com/LeoLee7/Directional_guidance"]] },
  { slug: "ascii", theme: "spa", pub: "Learning to Draw", name: "Learning to Draw ASCII", img: "colm", venue: "COLM 2026", short: "Across six LLMs, reading spatial layouts beats building them. Training models to build ASCII layouts more than doubles layout-construction accuracy and improves text-only spatial reasoning.",
    line: "Across six LLMs, accuracy in reading ASCII layouts exceeds accuracy in constructing them by 13 to 27 percentage points. Training on construction more than doubles construction accuracy, improves text-only spatial reasoning, and transfers to three external benchmarks.",
    links: [["Project page", "https://aiea-lab.github.io/Text2Space/"], ["arXiv", "https://arxiv.org/abs/2604.14641"], ["Code", "https://github.com/aiea-lab/Text2Space"], ["Dataset", "https://huggingface.co/datasets/ShiyuanHuang/Text2Space"]] },
  { slug: "touchingspace", theme: "acc", pub: "\u201cI didn", name: "TouchingSpace", img: "ts_overview", figs: [["2609.36404", "System pipeline: map retrieval, map transformation, and exploration on the trackpad."]], venue: "Under review, 2026", short: "A real-time voice-and-touch agent on Gemini native audio that grounds its answers in a map, with 83% accuracy on 393 spoken spatial questions, tested with blind and low-vision users.",
    line: "A voice-and-touch map agent on Gemini native audio. People explore a place by hand on a laptop trackpad and ask open questions; the agent reaches 83% accuracy on 393 spoken spatial questions. Built from zero with a blind co-designer and studied with 14 blind and low-vision adults.",
    links: [["arXiv", "https://arxiv.org/abs/2609.36404"], ["Video", "https://youtu.be/SRBqu2IxBNY"]] },
  { slug: "tactile-annotation", theme: "acc", pub: "From Anonymous", name: "Tactile Map Annotation", img: "named-places", scene: "print-scroll", figs: [["2608.23820", "Printed tactile maps (A, B), the annotation editor (C), and the exported legend, map content, and annotation files (D to F)."]], venue: "ASSETS 2026 Demo", short: "Braille and place labels for 3D-printed tactile maps.",
    line: "A web tool that lets a sighted helper add Braille and place labels to a generated 3D-printed tactile map, so each footprint can be identified by touch. Ten blind and low-vision readers compared unlabeled and annotated prints in formative sessions.",
    links: [["arXiv", "https://arxiv.org/abs/2608.23820"], ["Demo", "https://leolee7.github.io/Annotate_Braille/"], ["Video", "https://youtu.be/4KqVa0DeqdM"]] },
  { slug: "hai-survey", theme: "hai", pub: "A Survey on Human-AI", name: "Human-AI Collaboration Survey", img: "tist", figs: [["tist-lifecycle", "The lifecycle of human-AI collaboration with large foundation models, as organized in the survey."]], venue: "ACM TIST 2026",
    short: "How people and large foundation models work together, from model building to deployment.",
    line: "A survey of human-AI collaboration with large foundation models, covering human-guided model development, collaboration patterns, governance, and high-stakes applications.",
    links: [["Paper", "https://doi.org/10.1145/3841472"]] },
  { slug: "pattern-insights", theme: "hai", pub: "Pattern Discovery", name: "Pattern Insights Explorer", img: "www", venue: "WWW 2026 Demo, Amazon",
    line: "A modular framework that pairs wide-lens views of where candidate patterns cluster with sharp-focus checks of whether they are meaningful, for unlabeled data without ground truth.",
    links: [["Paper", "https://doi.org/10.1145/3774905.3793105"]] },
  { slug: "skills-on-board", theme: "hai", pub: "Skills on Board", name: "Skills on Board", img: "sob", venue: "Under review, 2026", short: "A human-in-the-loop harness for agent skills: trace any step to its evidence and edit it once. On SkillLearnBench, agents use half the output tokens at equal or better task performance.",
    line: "A system that turns a free-text SKILL.md into a typed meta file, rendered as a board for people and compiled into a structured skill for agents. On SkillLearnBench, agents use half the output tokens at equal or better task performance. Built during my internship at Amazon.",
    links: [["Video", "https://youtu.be/G_XJpzWnH_c"]] },
  { slug: "ser", theme: "hai", name: "SER", img: "ser", venue: "Amazon internship, 2024", short: "Search for what reviews know: who a product is for, how it feels, and the occasion it fits.",
    line: "A search system that turns customer reviews into search facets, each linked to the review sentence behind it, for needs catalogs do not record. On recipes it finds 18% more facet matches than keyword search. Built during my internship at Amazon.",
    links: [["Video", "https://youtu.be/TGy4yoTbdyI"]] },
  { slug: "swinmm", theme: "hea", pub: "SwinMM", name: "SwinMM", img: "swinmm", venue: "MICCAI 2023",
    short: "Self-supervised multi-view pre-training for 3D medical image segmentation.",
    line: "Masked multi-view pre-training with Swin Transformers for accurate and data-efficient 3D medical image segmentation.",
    links: [["arXiv", "https://arxiv.org/abs/2307.12591"], ["Code", "https://github.com/UCSC-VLAA/SwinMM"]] },
  { slug: "cpsc", theme: "tml", pub: "CPSC", name: "CPSC", img: "cpsc", venue: "IEEE TIM 2022",
    short: "Conformal prediction with shrunken centroids for reliable e-nose predictions.",
    line: "Conformal prediction with shrunken centroids, which quantifies how reliable each prediction is at lower cost than k-nearest-neighbor conformal prediction.",
    links: [["IEEE", "https://ieeexplore.ieee.org/abstract/document/9667498"]] },
  { slug: "taste-xuser", theme: "hea", pub: "Unsupervised Cross-User", name: "Cross-User Taste Recognition", img: "taste-xuser", venue: "IEEE TIM 2022",
    short: "Adapting sEMG taste models to new users without labels.",
    line: "Domain regularized component analysis and conformal prediction that let taste recognition models trained on one person work on others without new labels.",
    links: [["IEEE", "https://ieeexplore.ieee.org/document/9777907"]] },
  { slug: "boost-ai", theme: "tml", pub: "Boost AI", name: "Boost AI Power", img: "boost-ai", figs: [["boost-ai-processes", "The six processes compared over 30 random dataset partitions, with statistical significance tests."]], venue: "IEEE Sensors Journal 2021",
    short: "Data augmentation with unlabeled data and conformal prediction.",
    line: "A systematic comparison of data augmentation strategies for electronic noses with scarce labels, including a new ensemble inductive conformal prediction method.",
    links: [["IEEE", "https://ieeexplore.ieee.org/abstract/document/9505688"]] },
  { slug: "fgsm", theme: "tml", pub: "Bag of Tricks", name: "Bag of Tricks for FGSM-AT", img: "fgsm", venue: "arXiv 2022",
    short: "Simple tricks that stop catastrophic overfitting in fast adversarial training.",
    line: "Simple tricks, such as masking partial pixels, that prevent catastrophic overfitting in single-step FGSM adversarial training.",
    links: [["arXiv", "https://arxiv.org/abs/2209.02684"]] },
  { slug: "taste-eeg", theme: "hea", pub: "Basic Taste", name: "EEG-MSRNet", img: "taste-eeg", venue: "IEEE TIM 2023",
    short: "Recognizing basic tastes from brain signals.",
    line: "A multi-scale fully convolutional network with residual learning that recognizes basic taste sensations from EEG.",
    links: [["IEEE", "https://ieeexplore.ieee.org/abstract/document/10138514/"]] },
  { slug: "silent-speech", theme: "hea", pub: "Silent Speech", name: "Silent Speech Interface", img: "ssi", venue: "IEEE TIM 2023",
    short: "Turning the muscle signals of silent speech into audio.",
    line: "A Mandarin silent speech interface that converts surface EMG from silent speakers into audio, with help from paired EMG and audio of vocal speakers.",
    links: [["IEEE", "https://ieeexplore.ieee.org/document/10121584"]] },
  { slug: "taste-bimodal", theme: "hea", pub: "Bimodal Fusion", name: "Bi-FusionNet", img: "taste-bimodal", venue: "ICASSP 2023",
    short: "Fusing EEG and EMG to recognize tastes.",
    line: "A bimodal network that fuses complementary EEG and EMG features to recognize basic taste sensations.",
    links: [["IEEE", "https://ieeexplore.ieee.org/document/10095117"]] },
  { slug: "trilight", theme: "hea", pub: "A Tri-Light", name: "Tri-Light Warning System", img: "trilight-overview", figs: [["trilight", "From chest CT and clinical data to a progression probability and its credibility, mapped to high, uncertain, and low risk."]], venue: "EJR Open 2024",
    short: "Credibility-based risk stratification for hospitalized COVID-19 patients.",
    line: "A conformal-prediction warning system that sorts hospitalized COVID-19 patients into high, uncertain, and low risk from CT and clinical data.",
    links: [["Paper", "https://www.sciencedirect.com/science/article/pii/S2352047724000583"]] },
  { slug: "taste-intensity", theme: "hea", pub: "Quantitatively Recognizing", name: "Taste Intensity from Facial sEMG", img: "taste-intensity", venue: "Sensors 2021",
    short: "Measuring how strong a taste is from facial muscle signals.",
    line: "Quantitative recognition of the intensity of the five primary tastes from facial surface electromyography.",
    links: [["MDPI", "https://www.mdpi.com/1424-8220/21/21/6965"]] },
  { slug: "herbal-origins", theme: "hea", pub: "Classifying Herbal", name: "Herbal Medicine Origins", img: "herbal-origins", figs: [["enose", "Conventional aggregated features versus the longitudinal-information-in-a-line representation of the sensor signals."]], venue: "arXiv 2021",
    short: "Temporal and spectral features for fine-grained electronic-nose classification.",
    line: "Temporal and spectral feature extraction that lets an electronic nose distinguish the geographic origins of herbal medicines.",
    links: [["arXiv", "https://arxiv.org/abs/2104.06640"]] },
  { slug: "lotus-pavilion", theme: "make", name: "Lotus Pavilion", img: "lotus-07", cover: 1, videoHero: 1, venue: "Undergraduate design, Zhejiang University",
    short: "A light-responsive pavilion inspired by the lotus on West Lake.",
    line: "A light-responsive pavilion inspired by West Lake in Hangzhou, built from modular units that open to sunlight like lotus petals.",
    figs: [["lotus-01", "West Lake, Hangzhou, the site that inspired the design."], ["lotus-02", "Lotus leaves on the lake."],
      ["lotus-03", "Form studies: from the lotus leaf to a hexagonal module."], ["lotus-04", "A lotus opening, the motion each unit imitates."],
      ["lotus-05", "The light-responsive unit: section drawing and the built prototype."], ["lotus-06", "Generating the canopy form in eight steps."],
      ["lotus-07", "Rendering of the pavilion canopy in sunlight."], ["lotus-08", "Rendering of the pavilion by the lake."]],
    links: [["Video", "https://www.youtube.com/watch?v=9G6kR8N1WFM"]] },
  { theme: "make", name: "Art", art: "pets", venue: "Painting, photography, and visual design",
    line: "Seascape and pet paintings, photographs, and digital illustration." },
];

export const OVERVIEW_EARLY = {
  "cpsc": [
    "For assisted decisions and risk control, a model should say how reliable each prediction is. Conformal prediction (CP) quantifies this reliability, and is commonly built on k-nearest neighbors (CPKNN), which suffers from high variance and bias and long computation as feature dimensionality grows.",
    "CPSC, conformal prediction with shrunken centroids, regularizes class centroids to attenuate irrelevant features and shrink the sample space for prediction and reliability quantification. On a herbal medicine dataset from an electronic nose, we compared it with CP based on k-nearest neighbors, SVM, LightGBM, and random forests in offline prediction and in online prediction, where reliability decides which unlabeled samples augment the training set. CPSC reached significantly higher accuracy at lower computational cost than CPKNN, and augmentation with CPSC gave a statistically significant accuracy gain across reliability thresholds, with more class-balanced augmented data."],
  "boost-ai": [
    "Electronic noses can classify alternative herbal medicines, but supervised models depend on labeled training data that are slow and labor-intensive to collect. This study asks how far data augmentation can reduce that dependency.",
    "We compared five strategies, noise-adding augmentation, semi-supervised learning, classifier-based online learning, inductive conformal prediction (ICP) online learning, and our ensemble ICP online learning (EICP), against supervised baselines with LDA and SVM classifiers. Experiments covered different amounts of unlabeled data and simulated sensor drift from Gaussian noise and translational shift. EICP never lowered accuracy and improved it significantly on 25 of 36 simulated tasks (p \u2264 0.05)."],
  "herbal-origins": [
    "The origin of a herbal medicine matters for its treatment effect, and an electronic nose can potentially tell origins apart. Because odor fingerprints from different origins differ only slightly, this is much harder than telling categories apart, and feature extraction becomes the deciding factor.",
    "We classified the origins of three categories of herbal medicines with manual feature extraction, mathematical transformations, and deep learning, over 50 bootstrapped repetitions with three base classifiers. Compared with conventional aggregated features, the Fast Fourier Transform and our longitudinal-information-in-a-line approach improved accuracy significantly (p < 0.05) for all classifiers and categories, and a 1D CNN and multivariate time pooling (MTPool) gave partially significant gains."],
  "taste-xuser": [
    "Human taste sensation can be described with surface electromyography (sEMG), but pattern recognition models trained on one person do not generalize well to others. This work, where I am a co-first author, improves how taste models transfer across users by using unlabeled data from the new user.",
    "We applied two methods, domain regularized component analysis (DRCA) and conformal prediction with shrunken centroids (CPSC), in an unlabeled data augmentation pipeline evaluated on six subjects. DRCA improved classification accuracy over baselines trained only on the source user (p < 0.05), and combining DRCA with CPSC gave a statistically significant improvement as well, addressing cross-user distribution drift in sEMG-based taste recognition."],
  "taste-eeg": [
    "Taste sensation recognition is a keystone for taste-related brain-computer interfaces, with uses such as taste disorder diagnosis and virtual taste. EEG measures brain activity in response to stimulation, but accurate and generalizable EEG-based taste measurement remains hard.",
    "EEG-MSRNet is a fully convolutional network that classifies six classes (blank, sour, sweet, bitter, salty, umami). Multi-scale temporal convolutions with residual learning extract features at different frequencies, multi-scale spatial convolutions combine them across channels, and a convolutional layer with global average pooling replaces fully connected layers for prediction. Comparison experiments and ablations on a self-collected EEG dataset show stable and generalizable performance."],
  "taste-bimodal": [
    "Taste sensation can be measured objectively with EEG or EMG, but using the complementary information in both signals is still challenging.",
    "Bi-FusionNet uses two similar convolutional backbones to extract EEG and EMG features separately, then concatenates them for bimodal interaction. Training combines a center loss that pulls samples of the same class together, a mean squared error loss over sequence positions during stimulation, and a softmax loss. On a taste sensation dataset, bimodal fusion improves recognition, and Bi-FusionNet outperforms single-modal methods and other fusion methods."],
  "taste-intensity": [
    "Beyond telling tastes apart, this work asks whether sEMG from facial muscles can measure how strong a taste is. Subjects tasted filter paper soaked in solutions of citric acid, sucrose, magnesium chloride, sodium chloride, and sodium glutamate at different concentrations, covering sour, sweet, bitter, salty, and umami.",
    "After removing baseline wandering with Quadratic Variation Reduction and power frequency interference with an adaptive notch, we extracted 330 features per sample and trained an SVM regressor with five-fold cross-validation. It reached R\u00b2 scores of 0.7277, 0.1963, 0.7450, 0.7642, and 0.5055 for the five tastes, showing that the intensity of sour, bitter, and salty can be recognized quantitatively. Channel-wise feature selection then reduced the feature dimensionality for each taste, and we analyzed how performance relates to the number of subjects."],
  "silent-speech": [
    "A silent speech interface lets people communicate without producing sound, which can help, for example, people who have undergone a laryngectomy. Surface electromyography (sEMG) captures the neuromuscular activity of articulation, but without acoustic sound it is hard to convert a silent speaker's signals into the corresponding audio.",
    "This Mandarin silent speech interface learns the conversion with help from an auxiliary set of paired sEMG and audio recordings from vocal speakers. A hybrid of convolutional networks and Transformers (Conformer) uses both local and global information, and a pre-trained Parallel WaveGAN vocoder synthesizes speech from the predicted mel spectrograms. With four silent speakers, it reaches an average character error rate of 10.69% under automatic speech recognition, in a cross-subject setting."],
  "trilight": [
    "COVID-19 kept spreading and mutating, and hospitals needed a way to stratify patients by risk to allocate medical resources. We developed a conformal-prediction-based tri-light warning system that applies to both the original strain and emerging variants.",
    "The system extracts radiomic features from chest CT, combines them with clinical records, and sorts patients into high-risk (red), uncertain-risk (yellow), and low-risk (green) groups for ICU admission. Built on data from 3,646 patients across multiple centers in China, it held up under data distribution shifts, with an AUROC of 0.89 for the original strains and 0.77 to 0.85 for the Delta and Omicron variants."],
  "swinmm": [
    "Large Vision Transformers have improved pre-trained models for medical image segmentation, but they need large amounts of pre-training data, which are scarce in medicine. SwinMM, Masked Multi-view with Swin Transformers, uses multiple views of 3D medical data for accurate and data-efficient self-supervised learning.",
    "In pre-training, a masked multi-view encoder learns from several proxy tasks: image reconstruction, rotation, contrastive learning, and a mutual learning task that exploits the consistency between predictions from different views. In fine-tuning, a cross-view decoder aggregates the views with cross-attention. SwinMM outperforms the previous state-of-the-art self-supervised method, Swin UNETR, on several medical image segmentation tasks."],
};

/* technical summary shown under Overview on a project page, as [label, text] rows */
export const TECH = {
  touchingspace: [
    ["Model", "Gemini 2.5 Flash native audio, streamed over the Live API, with Google Search grounding."],
    ["Context", "Each turn, the agent sees where the finger is and how every place relates to it, in direction, distance, and containment computed from map geometry."],
    ["Map", "OpenStreetMap places, scaled onto the trackpad and revealed in four stages."],
    ["Feedback", "A hum grows louder near a place; vibration marks its edge."],
    ["Result", "83% accuracy on 393 spoken spatial questions."],
  ],
};

export const OVERVIEW = {
  "ser": [
    "Search and recommendation systems handle specific goals well, but not subjective needs such as a healthy birthday meal for a parent or a movie worth watching. Product catalogs rarely hold that kind of insight. Reviews and other user-generated content do.",
    "SER, an experiential search and retrieval system, extracts subjective information from user-generated content into EXP-DB, a domain-centric experiences database. A taxonomy of subjective needs and its classifiers connect user intent to item relevance, and the resulting experience index sits beside the catalog index to power faceted search by audience, feeling, and occasion."],
  "skills-on-board": [
    "Skills package the instructions an agent follows on a task, and most live as free-text Markdown in a SKILL.md file. That makes them hard to maintain: revising one step means searching a long document without knowing what depends on it, and reusing a skill means finding every value tied to the original task.",
    "Skills on Board treats skill maintenance as a data representation problem. A declared schema converts a skill into a typed meta file in which every step, learned rule, and source excerpt is a record with a stable identity. The meta file compiles into a structured SKILL.md for the agent and renders as a board for the user, who can trace a step to its evidence, edit it once to update it everywhere, and compare a new version with its parent record by record."],
  "fgsm": [
    "Adversarial training with samples from the Fast Gradient Sign Method (FGSM-AT) is a computationally simple way to train robust networks, but it suffers from catastrophic overfitting: robust accuracy can drop to zero within a single training step. Existing fixes rely on gradient regularizers or random initialization, which either cost much more computation or lower robust accuracy.",
    "We study a collection of tricks from three perspectives, data initialization, network structure, and optimization. Simple tricks turn out to be enough: masking partial pixels (even without randomness), using a large convolution stride and smooth activation functions, or regularizing the weights of the first convolutional layer. With PreActResNet-18 on CIFAR-10, the method reaches 49.8% accuracy against PGD-50 and 46.4% against AutoAttack, showing that pure FGSM-AT can train robust learners."],
  "lotus-pavilion": [
    "A light-responsive pavilion I designed during my undergraduate study at Zhejiang University. It takes its cue from the lotus on West Lake in Hangzhou: the canopy is a field of hexagonal modules, and each module adapts to sunlight and mimics the petals of a lotus.",
    "The design grew from form studies of lotus leaves and flowers. I built a working prototype of the responsive unit and developed the canopy form step by step from a single leaf-like surface."],
  "hai-survey": [
    "Large foundation models greatly expand what people and AI systems can achieve together, but realizing that potential responsibly requires addressing persistent challenges in safety, fairness, and control. This survey reviews human-AI collaboration with large foundation models along four lines: human-guided model development, design principles for collaboration, ethical and governance frameworks, and applications in high-stakes domains.",
    "At run time, it organizes collaboration into recurring patterns: human-steered AI, AI-augmented human work, mixed-initiative interaction, control handoff and delegation, and supervisory orchestration of agentic systems, a newer mode in which people monitor, guide, and intervene in multi-step AI workflows. The review finds that successful collaboration is not the automatic result of stronger models but the product of careful, human-centered design."],
  "touchingspace": [
    "Accessible map systems either make a layout explorable by hand or convey information through speech, and few combine both to support pre-travel spatial understanding for blind and low-vision (BLV) people. TouchingSpace retrieves map data for an outdoor place and renders its surroundings as bounded regions at fixed positions on a laptop trackpad. While exploring, people receive audio and haptic feedback and can ask a conversational agent open-ended questions.",
    "In a study with fourteen BLV participants, people used sound and vibration to locate places and speech to identify and describe them. The bounded surface supported discovery, revision, and spatial checks by hand, and participants expected this awareness to support future travel.",
    "I led TouchingSpace from zero: I built the system with a blind co-designer, benchmarked its spatial grounding, and ran the in-person studies."],
  "ascii": [
    "People sketch layouts to organize their thinking about space. We asked whether learning to build explicit layouts from spatial descriptions can give language models real spatial understanding.",
    "We introduce Text2Space, a dataset that pairs text descriptions with ASCII grid layouts, and find a read-write asymmetry: models read ASCII layouts well but struggle to construct them from text. Training on layout construction improves spatial reasoning from text alone, and the gains transfer to three external benchmarks."],
  "right-this-way": [
    "Reading or restating what is in an image is rarely the hard part for a vision-language model. Knowing that the image is not enough is. When the answer lies partly or wholly outside the frame, models seldom notice, and they answer anyway. We ask whether a VLM can judge that its view is insufficient, reason about where in space the missing information lies, and tell the user how to move the camera to get it. This matters most for blind and low-vision users, who cannot check what the camera caught.",
    "We release a human-labeled benchmark for this directional guidance task and a framework that generates synthetic training data by simulating \u201cwhere to know\u201d scenarios. Fine-tuning on this data significantly improves mainstream VLMs."],
  "tactile-annotation": [
    "On a 3D-printed tactile map, a building felt under the finger is an anonymous shape. Touch alone cannot tell which footprint is which, and a spoken description cannot reliably tie a shape to a specific place.",
    "We built a web-based tool that lets a sighted helper add Braille and place labels to a generated map model. Labeling happens after geometry generation, so the person doing it can account for the reader and the local Braille standard.",
    "We demonstrated it on five printed maps of different place types, from a downtown core to a college campus and a small dining mall. In formative sessions at a blind services center, ten blind and low-vision readers, one of them a Braille instructor, compared an unlabeled print with an annotated print of the same area. Four of the ten read Braille fluently, so the same per-label record is built to also drive an audio readout or a non-Braille code."],
  "pattern-insights": [
    "Discovering patterns in unfamiliar text is circular: extraction needs a taxonomy, but the taxonomy needs the patterns, and there are no ground-truth labels to resolve it. Pattern Insights Explorer alternates between a wide-lens view of where candidate patterns cluster and a sharp-focus check of whether each pattern is extracted correctly.",
    "I built it during my 2025 Applied Scientist internship at Amazon with Omar Alonso and Giorgio Ballardin. The framework grows a validated taxonomy over unlabeled conversation logs from a few seed keywords, with every pattern traceable to its source, and was demonstrated on 5,000 customer-service conversations."],
};

export const NEWS = [
  { slug: "colm-2026", to: "ascii", d: "Oct 2026", img: "colm",
    title: "Presented Learning to Draw ASCII at COLM 2026",
    h: "Presented <b>Learning to Draw ASCII</b> at <b>COLM 2026</b> in San Francisco.",
    body: [
      "People sketch layouts to organize their thinking about space. We asked whether learning to build explicit layouts from spatial descriptions can give language models real spatial understanding.",
      "We introduce Text2Space, a dataset that pairs text descriptions with ASCII grid layouts, and find a read-write asymmetry: models read ASCII layouts well but struggle to construct them from text. Training on layout construction improves spatial reasoning from text alone, and the gains transfer to three external benchmarks. This is joint work with Shiyuan Huang (co-first author), Jincheng He, and Leilani H. Gilpin.",
    ],
    imgs: [["colm", "Our COLM 2026 poster."]],
    links: [["Project page", "https://aiea-lab.github.io/Text2Space/"], ["arXiv", "https://arxiv.org/abs/2604.14641"], ["Code", "https://github.com/aiea-lab/Text2Space"], ["Dataset", "https://huggingface.co/datasets/ShiyuanHuang/Text2Space"]] },
  { slug: "pitchability-2026", rel: ["touchingspace"], d: "Sep 2026", img: "pitch",
    title: "Presenting TouchingSpace at PitchAbility 2026",
    h: "Presented <b>TouchingSpace</b> and our 3D-printed tactile maps with the AIEA Lab at <b>PitchAbility 2026</b>, <b>Vista Center</b>'s international pitch competition for assistive technology.",
    body: [
      "Our AIEA Lab team presented TouchingSpace and our 3D-printed tactile maps at the Exhibit & Demo Hall of PitchAbility 2026, the international pitch competition hosted by Vista Center for the Blind and Visually Impaired.",
      "PitchAbility drew applicants from more than 8 countries, and more than 35 companies exhibited assistive technology for people who are blind, have low vision, or are DeafBlind. Vista Center's recap of the event, sent to more than 6,000 people, listed the AIEA Lab among the exhibitors.",
      "At our table we showed TouchingSpace, which turns an outdoor place into an audio-haptic map on an everyday laptop trackpad, next to the 3D-printed tactile maps from our Braille annotation work.",
    ],
    imgs: [["pitch", "The AIEA Lab team at our exhibit table."], ["hall", "The Exhibit & Demo Hall at PitchAbility 2026. Photo: Vista Center."]],
    extra: "pitchability", about: "touchingspace",
    facts: [["Event", "PitchAbility 2026"], ["Host", "Vista Center for the Blind and Visually Impaired"], ["Where we were", "Exhibit & Demo Hall"]],
    links: [["Event page", "https://vistacenter.org/pitchability-vista-international-pitch-competition-2026/"], ["arXiv", "https://arxiv.org/abs/2609.36404"], ["Video", "https://youtu.be/SRBqu2IxBNY"]] },
  { slug: "amazon-2026", d: "Sep 2026",
    title: "Wrapping up my Applied Scientist internship at Amazon",
    h: "Finished my Applied Scientist internship at <b>Amazon</b> in Seattle, building <b>Skills on Board</b> for structured skill engineering for agents.", rel: ["skills-on-board"],
    body: [
      "From June to September 2026 I worked as an Applied Scientist Intern at Amazon in Seattle on structured skill engineering for agents.",
      "I encoded free-text SKILL.md prompts as typed, versioned graphs of each skill's solution approach and key steps. The same graph serves as documentation for people and as executable instructions for agents, and on SkillLearnBench it halved agent output tokens at equal or better task performance.",
      "I also linked each skill to its evidence and rollouts, so that every failure can be traced to the agent, the task, or the benchmark. This surfaced defects in the benchmarks themselves.",
    ], imgs: [], links: [["Video", "https://youtu.be/G_XJpzWnH_c"]], facts: [["Role", "Applied Scientist Intern"], ["Location", "Seattle, WA, USA"], ["Dates", "June to Sept. 2026"], ["Focus", "Structured skill engineering for agents"]] },
  { slug: "touchingspace-preprint", to: "touchingspace", d: "Sep 2026", img: "2609.36404",
    title: "New preprint: TouchingSpace",
    h: "New preprint on <b>TouchingSpace</b>, an audio-haptic map for blind and low-vision readers, studied in person at <b>Vista Center</b> and across San Jose, Santa Cruz, and Palo Alto.",
    body: [
      "Accessible map systems either make a layout explorable by hand or convey information through speech, and few combine both to support pre-travel spatial understanding for blind and low-vision (BLV) people. TouchingSpace retrieves map data for an outdoor place and renders its surroundings as bounded regions at fixed positions on a laptop trackpad. While exploring, people receive audio and haptic feedback and can ask a conversational agent open-ended questions.",
      "In a study with fourteen BLV participants, people used sound and vibration to locate places and speech to identify and describe them. The bounded surface supported discovery, revision, and spatial checks by hand, and participants expected this awareness to support future travel.",
    ],
    imgs: [["2609.36404", "TouchingSpace overview."]],
    links: [["arXiv", "https://arxiv.org/abs/2609.36404"], ["Demo video", "https://youtu.be/SRBqu2IxBNY"], ["Phase 1 on arXiv", "https://arxiv.org/abs/2604.14637"]] },
  { slug: "tist-2026", to: "hai-survey", d: "Sep 2026", img: "tist",
    title: "Survey on human-AI collaboration published in ACM TIST",
    h: "Our survey <b>A Survey on Human-AI Collaboration with Large Foundation Models</b> is published in <b>ACM Transactions on Intelligent Systems and Technology</b>.",
    body: [
      "The survey reviews how people and large foundation models work together, from human-guided model development and collaboration patterns to governance and high-stakes applications. It finds that successful human-AI systems are not the automatic result of stronger models but the product of careful, human-centered design.",
    ],
    imgs: [["tist", "Collaboration patterns and role allocation."]],
    links: [["Paper", "https://doi.org/10.1145/3841472"]] },
  { slug: "assets-2026", to: "tactile-annotation", d: "Aug 2026", img: "named-places",
    title: "Braille annotation tool accepted to ASSETS 2026",
    h: "Our Braille annotation tool for tactile maps is accepted to <b>ASSETS 2026</b> Posters and Demonstrations.",
    body: [
      "On a 3D-printed tactile map, a building felt under the finger is an anonymous shape. Touch alone cannot tell which footprint is which, and a spoken description cannot reliably tie a shape to a specific place.",
      "We built a web-based tool that lets a sighted helper add Braille and place labels to a generated map model. Labeling happens after geometry generation, so the person doing it can account for the reader and the local Braille standard. The work appears in the ASSETS 2026 Posters and Demonstrations track.",
    ],
    imgs: [["2608.23820", "Tactile maps and the annotation tool."]],
    links: [["arXiv", "https://arxiv.org/abs/2608.23820"], ["Try the tool", "https://leolee7.github.io/Annotate_Braille/"], ["Video", "https://youtu.be/4KqVa0DeqdM"]] },
  { slug: "colm-accept-2026", to: "ascii", d: "Jul 2026",
    title: "Learning to Draw ASCII accepted to COLM 2026",
    h: "<b>Learning to Draw ASCII</b> is accepted to <b>COLM 2026</b>.",
    body: [], imgs: [], links: [["arXiv", "https://arxiv.org/abs/2604.14641"]] },
  { slug: "www-2026", to: "pattern-insights", d: "Jul 2026", img: "www",
    title: "Pattern Insights Explorer at the WWW 2026 Demo Track",
    h: "Presented <b>Pattern Insights Explorer</b> at the <b>WWW 2026</b> Demo Track.",
    body: [
      "Discovering patterns in unfamiliar text is circular: extraction needs a taxonomy, but the taxonomy needs the patterns, and there are no ground-truth labels to resolve it. Pattern Insights Explorer alternates between a wide-lens view of where candidate patterns cluster and a sharp-focus check of whether each pattern is extracted correctly.",
      "I built the demo during my 2025 internship at Amazon, with Omar Alonso and Giorgio Ballardin. It runs on 5,000 customer-service conversations and was presented at the WWW 2026 Posters and Demos session.",
    ],
    imgs: [["www", "Our WWW 2026 demo poster."]],
    links: [["Paper", "https://doi.org/10.1145/3774905.3793105"]] },
  { slug: "amazon-2025", rel: ["pattern-insights"], d: "Sep 2025",
    title: "Finished my 2025 internship at Amazon",
    h: "Finished my Applied Scientist internship at <b>Amazon</b> on human-in-the-loop pattern discovery.",
    body: [
      "From June to September 2025 I worked as an Applied Scientist Intern at Amazon in Santa Clara. I developed a human-in-the-loop framework that grows a validated taxonomy over large unlabeled conversation logs from a few seed keywords, with every pattern traceable to its source.",
      "The work became Pattern Insights Explorer, presented at the WWW 2026 Demo Track.",
    ], imgs: [], links: [], facts: [["Role", "Applied Scientist Intern"], ["Location", "Santa Clara, CA, USA"], ["Dates", "June to Sept. 2025"], ["Outcome", "WWW 2026 demo paper"]] },
];

export const EXPERIENCE = [
  { logo: "amazon", org: "Amazon", role: "Applied Scientist Intern", place: "Seattle, WA", y: "2026", dates: "June to Sept. 2026", t0: 2026.42, t1: 2026.67, topic: "Skills on Board, agent skills as typed data", bullets: [
    "<b>Skills on Board (<a href=\"#project-skills-on-board\">project</a>, under review).</b> Proposed and built a system that stores agent skills as typed, versioned data instead of free text, so people can trace and edit each step and agents follow the same source. Halved agent output tokens on SkillLearnBench at equal or better task performance.",
    "<b>Pipeline-wide failure attribution.</b> Linked each skill to its evidence and rollouts so a failure can be traced to the agent, the task, or the benchmark; this found defects in SkillLearnBench itself."] },
  { logo: "amazon", org: "Amazon", role: "Applied Scientist Intern", place: "Santa Clara, CA", y: "2025", dates: "June to Sept. 2025", t0: 2025.42, t1: 2025.67, topic: "Taxonomy discovery from unlabeled conversations (WWW 2026)", bullets: [
    "<b>Taxonomy discovery from unlabeled conversations (<a href=\"#project-pattern-insights\">WWW 2026 Demo</a>).</b> Designed a modular, human-in-the-loop framework that evolves its own taxonomy from a few seed keywords, alternating a wide-lens view of where patterns cluster with sharp-focus checks of each extraction; every pattern traces to its source."] },
  { logo: "amazon", org: "Amazon", role: "Applied Scientist Intern", place: "Palo Alto, CA", y: "2024", dates: "June to Sept. 2024", t0: 2024.42, t1: 2024.67, topic: "Evidence-grounded search from reviews (SER)", bullets: [
    "<b>Evidence-grounded search from reviews (<a href=\"#project-ser\">SER</a>).</b> Built a search system that turns customer reviews into search facets, each linked to the review sentence behind it, to answer needs catalogs do not record. Later shown on recipes to find 18% more facet matches than keyword search."] },
  { logo: "nissan", org: "Nissan Research Center", role: "Data Scientist Intern", place: "Santa Clara, CA", y: "2023", dates: "July to Sept. 2023", t0: 2023.5, t1: 2023.67, topic: "Driver engagement in autonomous driving", bullets: [
    "<b>Driver engagement in autonomous driving.</b> Developed a time-series model of driver engagement from real-world driving logs, improving prediction accuracy by 16 percentage points."] },
];

export const EDUCATION = [
  { logo: "ucsc", org: "University of California, Santa Cruz", role: "Ph.D. in Computer Science and Engineering", sub: "Advisor: Leilani H. Gilpin", y: "2022 to 2027 (expected)" },
  { logo: "zju", org: "Zhejiang University", role: "M.Eng. in Control Science and Engineering", y: "2019 to 2022" },
  { logo: "zju", org: "Zhejiang University", role: "B.S., Chu Kochen Honors College", y: "2015 to 2019" },
];

/* Projects page sections, in display order */
export const THEMES = [
  ["spa", "Spatial intelligence in multimodal models", "How vision-language and language models perceive space, build an internal map of it, and act when what they see is not enough."],
  ["acc", "Grounded spatial agents", "Real-time agents that ground what they say in a map and convey space without vision."],
  ["hai", "Agents and human-in-the-loop systems", "Agent skills, search, and pattern discovery built at Amazon, and a survey of human-AI collaboration with foundation models."],
  ["make", "Design and making", "Things I designed and built by hand."],
  ["early", "Earlier work", "Clinical imaging, biosignals, electronic noses, and reliable prediction, from my master's and early Ph.D.", ["hea", "tml"]],
];

export const GROUPS = [
  ["spa", "Spatial intelligence", "Benchmarks, data, and training methods for spatial intelligence in language and vision-language models."],
  ["acc", "Accessibility", "Audio-haptic and tactile systems that help blind and low-vision people understand places."],
  ["hai", "Agents and human-in-the-loop", "Agent systems, human-in-the-loop tools, and surveys on people working with AI."],
  ["tml", "Trustworthy ML", "Conformal prediction and robust training for reliable predictions."],
  ["hea", "Health and sensing", "Models for clinical, physiological, and electronic-nose sensor data."],
];

export const PRIMARY = [["Learning to Draw", "spa"], ["Right This Way", "spa"], ["From Anonymous", "acc"], ["“I didn", "acc"], ["Touching Space", "acc"],
  ["Pattern Discovery", "hai"], ["Skills on Board", "hai"], ["A Survey on Human-AI", "hai"], ["CPSC", "tml"], ["Bag of Tricks", "tml"], ["Boost AI", "tml"]];

export const EDU_THEME = [
  { logo: "zju", deg: `B.S., Chu Kochen Honors College, Zhejiang University`, org: "2015 to 2019", theme: "Spatial interaction" },
  { logo: "zju", deg: `M.Eng., Control Science and Engineering, Zhejiang University`, org: "2019 to 2022", theme: "Biosensors" },
  { logo: "ucsc", deg: `Ph.D., Computer Science and Engineering, UC Santa Cruz`, org: "Advised by Leilani H. Gilpin, Sep 2022 to May 2027", theme: "Spatial intelligence in multimodal models and agents" },
];

export const VIDEOS = { touchingspace: { id: "SRBqu2IxBNY", thumb: "yt_ts" }, "skills-on-board": { id: "G_XJpzWnH_c", thumb: "yt_sob" }, "lotus-pavilion": { id: "9G6kR8N1WFM", thumb: "yt_lotus" }, "amazon-2026": { id: "G_XJpzWnH_c", thumb: "yt_sob" }, ser: { id: "TGy4yoTbdyI", thumb: "yt_ser" }, "tactile-annotation": { id: "4KqVa0DeqdM", thumb: "yt_tactile" } };

export const PUBS = [
  { img: "colm", y: 2026, v: "COLM", vy: "2026", top: 1, sel: 1, first: 1, tags: ["spa","llm"],
    t: "Learning to Draw ASCII Improves Spatial Reasoning in Language Models",
    a: "Shiyuan Huang*, Li Liu*, Jincheng He, Leilani H. Gilpin",
    l: [["Project page","https://aiea-lab.github.io/Text2Space/"],["arXiv","https://arxiv.org/abs/2604.14641"],["Code","https://github.com/aiea-lab/Text2Space"],["Dataset","https://huggingface.co/datasets/ShiyuanHuang/Text2Space"]] },
  { img: "named-places", y: 2026, v: "ASSETS", vy: "2026 Demo", top: 1, first: 1, tags: ["acc"],
    t: "From Anonymous Shapes to Named Places: A Tool for Braille and Place-Semantic Annotation of Tactile Maps",
    a: "Li Liu, Ashmita Dua, Jiaming Qu, David T. Lee, Leilani H. Gilpin",
    l: [["arXiv","https://arxiv.org/abs/2608.23820"],["Demo","https://leolee7.github.io/Annotate_Braille/"],["Video","https://youtu.be/4KqVa0DeqdM"]] },
  { img: "www", y: 2026, v: "WWW", vy: "2026 Demo", top: 1, first: 1, tags: ["hai"],
    t: "Pattern Discovery with Wide-Lens Analysis and Sharp-Focus Validation",
    a: "Li Liu, Omar Alonso, Giorgio Ballardin",
    l: [["Paper","https://doi.org/10.1145/3774905.3793105"]] },
  { img: "sob", y: 2026, v: "Under review", vy: "2026", first: 1, tags: ["hai"],
    t: "Skills on Board: Maintaining Agent Skills as Typed Data",
    a: "Li Liu, Jiaming Qu, Zhiyu Chen, Pei Zhang, Omar Alonso",
    l: [["Video","https://youtu.be/G_XJpzWnH_c"]] },
  { img: "ts_overview", y: 2026, v: "arXiv", vy: "2026", sel: 1, first: 1, tags: ["acc","hai","spa"],
    t: "“I didn’t know how to read a map, but now I can”: TouchingSpace, an Audio-Haptic Map for Blind and Low-Vision Readers",
    a: "Li Liu, Yihe Wang, Jiaming Qu, Ashmita Dua, David T. Lee, Leilani H. Gilpin",
    l: [["arXiv","https://arxiv.org/abs/2609.36404"],["Video","https://youtu.be/SRBqu2IxBNY"]],
    phase1: { t: "Touching Space: Accessible Map Exploration Through Conversational Audio-Haptic Interaction", a: "Li Liu, Jiaming Qu, Marc Jowell Bagaoisan, David T. Lee, Leilani H. Gilpin", y: 2026, u: "https://arxiv.org/abs/2604.14637" } },
  { img: "rtw", y: 2024, v: "NeurIPS", vy: "2024", top: 1, sel: 1, pin: 2, first: 1, tags: ["acc","llm","spa"],
    t: "Right This Way: Can VLMs Guide Us to See More to Answer Questions?",
    a: "Li Liu*, Diji Yang*, Sijia Zhong, Kalyana Suma Sree Tholeti, Lei Ding, Yi Zhang, Leilani H. Gilpin",
    arx: "2411.00394", l: [["Paper","https://proceedings.neurips.cc/paper_files/paper/2024/file/efe4e50d492fedc0dfd2959f3320a974-Paper-Conference.pdf"],["Code","https://github.com/LeoLee7/Directional_guidance"]] },
  { arx: "oa-covid", y: 2024, v: "EJR Open", vy: "2024", img: "trilight-overview", first: 1, tags: ["hea","tml"],
    t: "A Tri-Light Warning System for Hospitalized COVID-19 Patients: Credibility-Based Risk Stratification for Future Pandemic Preparedness",
    a: "Chuanjun Xu*, Qinmei Xu*, Li Liu*, Mu Zhou, Zijian Xing, Zhen Zhou, Danyang Ren, Changsheng Zhou, Longjiang Zhang, Xiao Li, Xianghao Zhan, Olivier Gevaert, Guangming Lu",
    l: [["Paper","https://www.sciencedirect.com/science/article/pii/S2352047724000583"]] },
  { arx: "oa-tist", y: 2026, v: "ACM TIST", vy: "2026", img: "tist", sel: 1, tags: ["hai","llm"],
    t: "A Survey on Human-AI Collaboration with Large Foundation Models",
    a: "Vanshika Vats*, Marzia Binta Nizam*, Minghao Liu, Ziyuan Wang, Richard Ho, Mohnish Sai Prasad, Vincent Titterton, Sai Venkat Malreddy, Riya Aggarwal, Yanwen Xu, Lei Ding, Jay Mehta, Nathan Grinnell, Li Liu, Sijia Zhong, Devanathan Nallur Gandamani, Xinyi Tang, Rohan Ghosalkar, Celeste Shen, Rachel Shen, Nafisa Hussain, Kesav Ravichandran, James Davis",
    l: [["Paper","https://doi.org/10.1145/3841472"]] },
  { img: "swinmm", y: 2023, v: "MICCAI", vy: "2023", top: 1, tags: ["hea"],
    t: "SwinMM: Masked Multi-view with Swin Transformers for 3D Medical Image Segmentation",
    a: "Yiqing Wang, Zihan Li, Zihao Wei, Jieru Mei, Li Liu, Chen Wang, Shengtian Sang, Alan Yuille, Cihang Xie, Yuyin Zhou",
    l: [["arXiv","https://arxiv.org/abs/2307.12591"],["Code","https://github.com/UCSC-VLAA/SwinMM"]] },
  { arx: "oa-bimodal", img: "taste-bimodal", y: 2023, v: "ICASSP", vy: "2023", tags: ["hea"],
    t: "Bimodal Fusion Network for Basic Taste Sensation Recognition from Electroencephalography and Electromyography",
    a: "Han Gao, Shuo Zhao, Huiyan Li, Li Liu, You Wang, Ruifen Hu, Jin Zhang, Guang Li",
    l: [["IEEE","https://ieeexplore.ieee.org/document/10095117"]] },
  { arx: "oa-eeg", img: "taste-eeg", y: 2023, v: "IEEE TIM", vy: "2023", tags: ["hea"],
    t: "Basic Taste Sensation Recognition from EEG Based on Multi-Scale Convolutional Neural Network with Residual Learning",
    a: "Han Gao, Shuo Zhao, Huiyan Li, Li Liu, Hengyang Wang, You Wang, Zhiyuan Luo, Jin Zhang, Guang Li",
    l: [["IEEE","https://ieeexplore.ieee.org/abstract/document/10138514/"]] },
  { arx: "oa-silent", img: "ssi", y: 2023, v: "IEEE TIM", vy: "2023", tags: ["hea"],
    t: "Silent Speech Interface with Vocal Speaker Assistance Based on Convolution-augmented Transformer",
    a: "Huiyan Li, Yihao Liang, Han Gao, Li Liu, You Wang, Daqi Chen, Zhiyuan Luo, Guang Li",
    l: [["IEEE","https://ieeexplore.ieee.org/document/10121584"]] },
  { arx: "oa-cpsc", img: "cpsc", y: 2022, v: "IEEE TIM", vy: "2022", first: 1, tags: ["tml","hea"],
    t: "CPSC: Conformal Prediction With Shrunken Centroids for Efficient Prediction Reliability Quantification and Data Augmentation, a Case in Alternative Herbal Medicine Classification With Electronic Nose",
    a: "Li Liu*, Xianghao Zhan*, Xikai Yang*, Xiaoqing Guan, Rumeng Wu, Zhan Wang, Zhiyuan Luo, You Wang, Guang Li",
    l: [["IEEE","https://ieeexplore.ieee.org/abstract/document/9667498"]] },
  { arx: "oa-xuser", img: "taste-xuser", y: 2022, v: "IEEE TIM", vy: "2022", first: 1, tags: ["tml","hea"],
    t: "Unsupervised Cross-User Adaptation in Taste Sensation Recognition Based on Surface Electromyography with Conformal Prediction and Domain Regularized Component Analysis",
    a: "Hengyang Wang*, Xianghao Zhan*, Li Liu*, Asif Ullah, Huiyan Li, Han Gao, You Wang, Ruifen Hu, Guang Li",
    l: [["IEEE","https://ieeexplore.ieee.org/document/9777907"]] },
  { img: "fgsm", y: 2022, v: "arXiv", vy: "2022", tags: ["tml"],
    t: "Bag of Tricks for FGSM Adversarial Training",
    a: "Zichao Li, Li Liu, Zeyu Wang, Yuyin Zhou, Cihang Xie",
    l: [["arXiv","https://arxiv.org/abs/2209.02684"]] },
  { arx: "oa-boost", img: "boost-ai", y: 2021, v: "IEEE Sensors", vy: "2021", first: 1, tags: ["tml","hea"],
    t: "Boost AI Power: Data Augmentation Strategies With Unlabeled Data and Conformal Prediction, a Case in Alternative Herbal Medicine Discrimination With Electronic Nose",
    a: "Li Liu*, Xianghao Zhan*, Rumeng Wu, Xiaoqing Guan, Zhan Wang, Wei Zhang, Mert Pilanci, You Wang, Zhiyuan Luo, Guang Li",
    l: [["IEEE","https://ieeexplore.ieee.org/abstract/document/9505688"]] },
  { img: "herbal-origins", y: 2021, v: "arXiv", vy: "2021", first: 1, tags: ["hea"],
    t: "Classifying Herbal Medicine Origins by Temporal and Spectral Data Mining of Electronic Nose",
    a: "Li Liu*, Xianghao Zhan*, Ziheng Duan*, Yi Wu, Rumeng Wu, Xiaoqing Guan, Zhan Wang, You Wang, Guang Li",
    l: [["arXiv","https://arxiv.org/abs/2104.06640"]] },
  { arx: "oa-intensity", img: "taste-intensity", y: 2021, v: "Sensors", vy: "2021", tags: ["hea"],
    t: "Quantitatively Recognizing Stimuli Intensity of Primary Taste Based on Surface Electromyography",
    a: "Hengyang Wang, Dongcheng Lu, Li Liu, Han Gao, Rumeng Wu, Yueling Zhou, Qing Ai, You Wang, Guang Li",
    l: [["MDPI","https://www.mdpi.com/1424-8220/21/21/6965"]] },
];

export const AVATAR = "assets/img/avatar.jpg";
export const TEASERS = {
 "yt_sob": { "a": "assets/img/video/skillsonboard.jpg" },
 "yt_ser": { "a": "assets/img/video/ser.jpg" },
 "yt_tactile": { "a": "assets/img/video/tactile.jpg" },
 "fgsm": { "a": "assets/img/papers/fgsm.jpg", "full": "assets/img/full/fgsm.png" },
 "trilight-overview": { "a": "assets/img/papers/trilight-overview.jpg", "full": "assets/img/full/trilight-overview.jpg" },
 "herbal-origins": { "a": "assets/img/papers/herbal-origins.jpg", "full": "assets/img/full/herbal-origins.jpg" },
 "boost-ai-processes": { "a": "assets/img/papers/boost-ai-processes.jpg", "full": "assets/img/full/boost-ai-processes.png" },
 "taste-eeg": { "a": "assets/img/papers/taste-eeg.jpg", "full": "assets/img/full/taste-eeg.jpg" },
 "taste-bimodal": { "a": "assets/img/papers/taste-bimodal.jpg", "full": "assets/img/full/taste-bimodal.png" },
 "boost-ai": { "a": "assets/img/papers/boost-ai.jpg", "full": "assets/img/full/boost-ai.png" },
 "taste-xuser": { "a": "assets/img/papers/taste-xuser.jpg", "full": "assets/img/full/taste-xuser.png" },
 "cpsc": { "a": "assets/img/papers/cpsc.svg" },
 "taste-intensity": { "a": "assets/img/papers/taste-intensity.jpg", "full": "assets/img/full/taste-intensity.jpg" },
 "ssi": { "a": "assets/img/papers/ssi.jpg", "full": "assets/img/full/ssi.png" },
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
 "named-places": { "a": "assets/img/papers/named-places.jpg", "full": "assets/img/full/named-places.png" },
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
 "sob": { "a": "assets/img/papers/sob.jpg", "full": "assets/img/full/sob.png" },
 "ser": { "a": "assets/img/papers/ser.jpg", "full": "assets/img/full/ser.png" },
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
 "12": "assets/img/art/12.jpg",
 "pets": "assets/img/art/pets.jpg"
};
export const LOGOS = {
 "amazon": "assets/img/logos/amazon.png",
 "nissan": "assets/img/logos/nissan.png",
 "ucsc": "assets/img/logos/ucsc.png",
 "zju": "assets/img/logos/zju.png"
};

/* photo mosaics on project pages: one portrait on the left, two landscapes stacked on the right */
export const PHOTOS = {
  "tactile-annotation": {
    items: [
      ["assets/img/photos/tactile-campus.jpg", "A 3D-printed tactile map of a campus and its surroundings, held up outdoors."],
      ["assets/img/photos/tactile-reading.jpg", "Two hands explore a printed tactile map beside a refreshable Braille display."],
      ["assets/img/photos/tactile-tiles.jpg", "Six printed map tiles: the top row without labels, the bottom row with Braille labels on the buildings."],
    ],
    cap: "Printed maps: a campus map; reading a map by hand next to a refreshable Braille display; three areas printed without labels (top row) and with Braille labels (bottom row).",
  },
};
