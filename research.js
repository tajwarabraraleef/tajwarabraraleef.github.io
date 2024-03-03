var imageId = "ius_2023_image";
var image1 = "images/ius_2023_1.png";
var image2 = "images/ius_2023_2.gif";
var paperTitle = "Implementation of Shear Wave and Strain Elastography with Micro-Ultrasound";
var descriptiom = "The first ever implementation of elastographic imaging (both strain and shear wave elastography) in a commercial microUS system and thus enabling multi-parametric microUS imaging and enabling improved cancer imaging.";
var publisherDetailsLinks =  `
  <em><a href="https://2023.ieee-ius.org/" target="_blank">IEEE International Ultrasonic Symposium (IUS)</a></em>, Montréal, Canada, 2023
  <br>
  <strong style="color:red"> (Oral Presentation; Travel Award)</strong>
  <br>
  [ <a href="https://ieeexplore.ieee.org/abstract/document/10306532" target="_blank">Paper</a> ]

`;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;


var imageId = "swave_image";
var image1 = "images/swave.png";
var image2 = "images/swave2.png";
var paperTitle = "Multi-Frequency 3D Shear Wave Absolute Vibro-Elastography (S-WAVE) System for the Prostate";
var descriptiom = "First-of-a-kind multi-frequency 3D Shear Wave Absolute Vibro-Elastography (S-WAVE) system for the prostate, using a bandpass sampling strategy and transperineal excitation. This system is compatible with both transperineal biopsy and prostate brachytherapy procedures. A S-WAVE based cancer classifier is also designed in this work.";
var publisherDetailsLinks =  `
                              <em><a href="https://www.ieeetmi.org/" target="_blank">IEEE Transactions on Medical Imaging (TMI)</a>, 2023</em>
                              <br>
                              [ <a href="https://ieeexplore.ieee.org/abstract/document/10159167" target="_blank">Paper</a> ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;


var imageId = "ln_image";
var image1 = "images/ln.png";
var image2 = "images/ln2.gif";
var paperTitle = "Prior CT improves deep learning for malignancy risk estimation of screening-detected pulmonary nodules";
var descriptiom = "A deep learning algorithm is developed to estimate 3-year malignancy risk of detected pulmonary nodules utilizing time-series data (current and prior low-dose CT examinations). This model outperforms all current state-of-the-art that uses only single time-point CT examinations.";
var publisherDetailsLinks =  `
                <em><a href="https://pubs.rsna.org/journal/radiology" target="_blank">Radiology, Radiological Society of North America (RSNA)</a></em>, 2023
                <br>
                <font color="red"><strong> (Extension of MSc thesis)</strong></font>
                <br>
                [ <a href="https://pubs.rsna.org/doi/abs/10.1148/radiol.223308" target="_blank">Paper</a> ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;


var imageId = "probemounted_image";
var image1 = "images/uffc_1.png";
var image2 = "images/uffc_2.gif";
var paperTitle = "3D Transducer Mounted Shear Wave Absolute Vibro-Elastography: Proof of Concept";
var descriptiom = "First-of-a-kind handheld multi-frequency 3D S-WAVE system designed for targeted systematic prostate biopsy procedures. This system incorporates a new transducer-mounted excitation device, enabling it to retain the ultrasound's portability.";
var publisherDetailsLinks =  `<em><a href="https://ieee-uffc.org/publication/t-uffc" target="_blank">IEEE Transactions on Ultrasonics, Ferroelectrics, and Frequency Control (TUFFC)</a></em>, 2023
    <br>
    <font color="red"><strong>(Spotlight Issue on Interventional Ultrasound; Featured as the cover article)</strong></font>
    <br>
    [ <a href="https://ieeexplore.ieee.org/abstract/document/10054448" target="_blank">Paper</a> &nbsp|&nbsp
      <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10234147" target="_blank"> Cover feature</a>

    ]`;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;


var imageId = "abs_image";
var image1 = "images/optimal1.png";
var image2 = "images/optimal.gif";
var paperTitle = "Optimizing Prostate Cancer Treatment in Men with Advanced Local Disease (OPTiMAL) Study: Initial Multi-Modal Imaging Results";
var descriptiom = "Initial results of a clinical trial where we are conducting multi-modal imaging with our 3D S-WAVE system. The imaging results, which also includes multi-parametric MR, are compared with biopsy identified cancers zones where a positive correlation is observed.";
var publisherDetailsLinks =  `<em><a href="https://www.brachyjournal.com/" target="_blank">Brachytherapy, American Brachytherapy Society Conference</a></em>, Vancouver, Canada, 2023
    <br>
    [ <a href="https://www.brachyjournal.com/article/S1538-4721(23)01530-1/fulltext" target="_blank">Abstract</a> ]`;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;
var imageId = "micro_image";
var image1 = "images/3d_micro.png";
var image2 = "images/3d_micro.gif";
var paperTitle = "Robotically controlled three-dimensional micro-ultrasound for prostate biopsy guidance";
var descriptiom = "Design of a robotically controlled system to enable 3D imaging with the only commercial microUS system from prostate (ExactVu system). With 3D information, better guidance can be achieved during biopsy. It also enables the possibility of 3D multi-parametric imaging.";
var publisherDetailsLinks =  `
    <em><a href="https://sites.google.com/view/ipcai-2023/home" target="_blank">Information Processing in Computer-Assisted Interventions (IPCAI)</a></em>, Munich, Germany, 2023
    <br>
    <strong style = "color:red">(Oral Presentation)</strong>
    <br>
    [ <a href="https://link.springer.com/article/10.1007/s11548-023-02869-3" target="_blank">Paper</a> ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;


var imageId = "probemounted_ius_image";
var image1 = "images/probe_mount2.gif";
var image2 = "images/probe_mounted.gif";
var paperTitle = "3D Shear Wave Absolute Vibro-Elastography System for Targeted Prostate Biopsy: Initial Results";
var descriptiom = "Initial design of a 3D S-WAVE system using an end-firing probe for prostate imaging. The system was validated by imaging quality assurance phantoms and in vivo liver data, comparing quantitative measurements to magnetic resonance elastography.";
var publisherDetailsLinks =  `
    <em><a href="https://2022.ieee-ius.org/" target="_blank">IEEE International Ultrasonic Symposium (IUS)</a></em>, Venice, Italy, 2022
    <br>
    <strong style="color:red"> (Oral Presentation; Travel Award)</strong>
    <br>
    [ <a href="https://ieeexplore.ieee.org/abstract/document/9958838" target="_blank">Paper</a> ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;

var imageId = "qi_ius_image";
var image1 = "images/qi_ius1.png";
var image2 = "images/qi_ius2.png";
var paperTitle = "Multifrequency liver shear wave absolute vibro-elastography with an xmatrix array-2d vs. 3d comparison study";
var descriptiom = "2D vibro-elastography techniques are still the current state-of-the-art and no study exists to compare 2D vs 3D in a controlled setting. This study tackles this while using 3D magnetic resonance elastography as the reference standard. Consistent overestimation was seen with 2D reconstruction in both the phantom and in vivo dataset, resulting in a lower agreement to the MRE results when compared to the 3D reconstruction in a similar setting.";
var publisherDetailsLinks =  `
    <em><a href="https://2022.ieee-ius.org/" target="_blank">IEEE International Ultrasonic Symposium (IUS)</a></em>, Venice, Italy, 2022
    <br>
    <font color="red"><strong> (Oral Presentation)</strong></font>
    <br>
    [ <a href="https://ieeexplore.ieee.org/abstract/document/9958511" target="_blank">Paper</a> ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;

var imageId = "biopsy_image";
var image1 = "images/biop1.png";
var image2 = "images/biop2.png";
var paperTitle = "Registration of transperineal template mapping biopsy cores to volumetric ultrasound";
var descriptiom = "This framework uses information taken from the existing workflow of transperineal template mapping biopsy (such as the needle insertion point and depth) to register the pathology of the cores to pre-operative ultrasound volumes automatically. No prior method exists for this.";
var publisherDetailsLinks =  `
              <a href="https://sites.google.com/view/ipcai2022/home/" target="_blank"><em>Information Processing in Computer-Assisted Interventions (IPCAI)</em></a>, Tokyo, Japan, 2022
              <br>
              <font color="red"><strong> (Oral Presentation; Young Investigator Travel Award)</strong></font> &nbsp
              <br>
              [ <a href="https://rdcu.be/cKKFX" target="_blank">Paper</a> &nbsp|&nbsp
              <a href="https://github.com/tajwarabraraleef/TTMB-biopsy-core-registration" target="_blank">Code</a> ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;

var imageId = "tpgan_image";
var image1 = "images/tpgan3.png";
var image2 = "images/tpgans.gif";
var paperTitle = "Rapid treatment planning for low-dose-rate prostate brachytherapy with TP-GAN";
var descriptiom = "An end-to-end framework capable of generating treatment plans for low-dose-rate prostate brachytherapy within seconds compared to manually creating plans (current standard) which takes over 20 min. This is done utilizing GANs with custom application-specific loss functions.";
var publisherDetailsLinks =  `
              <a href="https://miccai2021.org/en/" target="_blank"><em>Medical Image Computing and Computer Assisted Intervention (MICCAI)</em></a>, Strasbourg, France, 2021
              <br>
              <font color="red"><strong>(Oral Presentation)</strong></font> &nbsp
              <br>
              [
              <a href="https://link.springer.com/epdf/10.1007/978-3-030-87202-1_56?sharing_token=XMfrj1i6h4Yx_eUeGvt4wve4RwlQNchNByi7wbcMAY5jIjVfLm7XRSlmEv2IA6krH_IFYovsRiFpSRmT2CoGwloGMqfCD3mGIDC9b___FUR8--m1mXocrJswEGo5TwyTHVF7eAu1ByAYvDM42pkrhy06tvrXUWcTwidPAkeJb2k%3D" target="_blank">Paper</a> &nbsp|&nbsp
              <a href="https://www.rsipvision.com/MICCAI2021-Tuesday/4/" target="_blank">Interview</a> &nbsp|&nbsp
              <a href="https://arxiv.org/abs/2103.09996" target="_blank">arXiv</a> &nbsp|&nbsp
              <a href="https://github.com/tajwarabraraleef/TP-GAN" target="_blank">Code</a> ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;

var imageId = "cgan_image";
var image1 = "images/cGAns11.png";
var image2 = "images/cGAns2.png";
var paperTitle = "Centre-specific autonomous treatment plans for prostate brachytherapy using cGANs";
var descriptiom = "A novel approach to automating centre-specific treatment plans for low-dose-rate prostate brachytherapy. Conditional GAN was used to solve the optimization problem of placing needles into the prostate gland. These needles allow seeds to be placed in a way that radiates the gland alone and spares healthy surrounding tissues.";
var publisherDetailsLinks =  `
              <a href="http://www.ipcai.org/" target="_blank"><em>Information Processing in Computer-Assisted Interventions (IPCAI)</em></a>, Munich, Germany, 2021 &nbsp
              <br>
              <font color="red"><strong>(Oral Presentation, Honorary Award for Best Presentation)</strong></font>
              <br>
              [ <a href="https://link.springer.com/epdf/10.1007/s11548-021-02405-1?sharing_token=MF1oEwRa6pGvFm32e8Vr-fe4RwlQNchNByi7wbcMAY5yK2t79Ld1LyvKdj4O86W-eJKERMX3fzzIoHbqG-VEdFfJckkkJN2Ef8MXj0pOqOwczUkeIispcquibso5I5D-7lIbdYguIuMWBHSBiq5Mv-_2k9dM1RCjxDcts7JUf_TgSQuKqlEQNG_F6C1BZm1J" target="_blank">Paper</a> &nbsp|&nbsp
                <!-- <a href="https://www.youtube.com/watch?v=F5kOCjiZpR4&ab_channel=OrcunGoksel" target="_blank">Video</a> &nbsp|&nbsp -->
                <a href="https://github.com/tajwarabraraleef/3Dpix2pix-for-prostate-brachytherapy" target="_blank">Code</a>
               ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;

var imageId = "coseg_image";
var image1 = "images/coseg.png";
var image2 = "images/coseg2.gif";
var paperTitle = "Co-Generation and Segmentation for Generalized Surgical Instrument Segmentation on Unlabelled Data";
var descriptiom = "A novel joint generation and segmentation strategy designed to train a segmentation model with generalization capability to domains containing no labeled data. This strategy solves the issue of having limited labeled data for actual robot-assisted surgery procedures. ";
var publisherDetailsLinks =  `
                  <a href="https://miccai2021.org/en/" target="_blank"><em>Medical Image Computing and Computer Assisted Intervention (MICCAI)</em></a>, Strasbourg, France, 2021
                  <br>
                  <font color="red"><strong> (Oral Presentation; MICCAI travel award)</strong></font> &nbsp
              <br>
              [ <a
                      href="https://link.springer.com/epdf/10.1007/978-3-030-87202-1_39?sharing_token=ajyXq8Wr3FCN1w3fyLJl8Pe4RwlQNchNByi7wbcMAY5jIjVfLm7XRSlmEv2IA6krM3ROQ4V5ULwAWxb1Fz1mjdUQpDH8xAMq7sZpoXcVl4OqoN-UhGwS7-zUQzcYkh2GLoe6K_NG9vQWW0ymts1VTzBXvGJ2c7haUWox0a-JqEM%3D" target="_blank">Paper</a> &nbsp|&nbsp

                <a href="https://arxiv.org/abs/2103.09276" target="_blank">arXiv</a> &nbsp|&nbsp
              <a href="https://github.com/tajwarabraraleef/coSegGAN" target="_blank">Code</a> ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;

var imageId = "mass_image";
var image1 = "images/mass1.png";
var image2 = "images/mass2.png";
var paperTitle = "Automatic Mass Classification in Breast Using Transfer Learning of Deep Convolutional Neural Network and Support Vector Machine";
var descriptiom = "In this work, an automated classifier was designed for the classification of mass from mammograms. The proposed pipeline uses DCNN for feature extraction, bagged decision tree for feature selection, and an SVM classifier for distinguishing between tissue with/without mass.";
var publisherDetailsLinks =  `
              <a href='https://ieeexplore.ieee.org/xpl/conhome/9230456/proceeding' target="_blank"><em>IEEE Region 10 Symposium (TENSYMP)</em></a>, 2020
              <br>
              <font color="red"><strong> (Oral Presentation)</strong></font>
              <br>
              [ <a href="https://ieeexplore.ieee.org/abstract/document/9230708" target="_blank">Paper</a> ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;

var imageId = "ant_image";
var image1 = "images/ant3.png";
var image2 = "images/ant4.png";
var paperTitle = "Design, Measurement and Performance Enhancement of a Miniaturized Implantable Antenna for Biomedical Applications";
var descriptiom = "A biomedical antenna was designed for wireless communication from inside a living body. The operating band for this antenna is in the Industrial, Scientific, and Medical band (2.4–2.48 GHz). The tiny dimension of the antenna with the 9.45 μm thickness of the patch allows it to be highly flexible- providing excellent results even in extreme conditions where the antenna conforms along the curvature of the body.";
var publisherDetailsLinks =  `
              <a  href='https://ietresearch.onlinelibrary.wiley.com/journal/17500443' target="_blank"><em>Micro & Nano Letters</em></a>, 2017
              <br>
              [ <a href="https://ietresearch.onlinelibrary.wiley.com/doi/10.1049/mnl.2017.0272" target="_blank">Paper</a> ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;



var imageId = "fast_image";
var image1 = "images/fast1.png";
var image2 = "images/fast2.png";
var paperTitle = "Fast pet scan tumor segmentation using superpixels, principal component analysis and k-means clustering";
var descriptiom = "This work presents a fast positron emission tomography tumor segmentation method using superpixels, principal component analysis, and k-means clustering.";
var publisherDetailsLinks =  `
              <a href="https://www.mdpi.com/journal/mps" target="_blank"><em>Methods and Protocols</em></a>, 2018
              <br>
              [ <a href="https://www.mdpi.com/2409-9279/1/1/7" target="_blank">Paper</a> ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;



var imageId = "cnnreg_image";
var image1 = "images/cnnreg1.png";
var image2 = "images/cnnreg2.png";
var paperTitle = "CNN regressor for automating treatment planning of cervical brachytherapy";
var descriptiom = "Developed a framework using CNNs that can predict the geometric transformation of an object based on a target. The idea was to analyze if such a regression network can be used to find the transformation parameters of a brachytherapy applicator in the cervix from MRI scans; hence pinpointing the exact location of the device within the body.";
var publisherDetailsLinks =  `
              <a href="https://lkeb.lumc.nl/" target="_blank"><em>LKEB</em></a>, Leiden University Medical Center, Netherlands, 2017
              <br>
              [ <a href="https://github.com/tajwarabraraleef/Registration-using-CNN-STN-ICSTN/tree/master/assets/report" target="_blank">Report</a> &nbsp|&nbsp
              <a href="https://github.com/tajwarabraraleef/Registration-using-CNN-STN-ICSTN" target="_blank">Code
              </a> ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;


var imageId = "scan_image";
var image1 = "images/3dscan.jpg";
var image2 = "images/3dscan.gif";
var paperTitle = "Complete End-To-End Low Cost Solution To a 3D Scanning System with Integrated Turntable";
var descriptiom = "In this project, a full 3D scanning system was designed along with a low-cost turntable. The software included a GUI and was implemented with C++ and Point cloud Library (PCL) that uses a Kinect sensor as the sensor. The point clouds are then passed through a filter followed by registration and reconstruction to generate the 3D data.";
var publisherDetailsLinks =  `
                <a href="https://www.u-bourgogne.fr/" target="_blank"><em>University of Burgundy</em></a>, France, 2016
                <br>
                [ <a href="https://arxiv.org/abs/1709.02247" target="_blank">arXiv</a> ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;


var imageId = "skin_cancer_image";
var image1 = "images/skin_cancer1.png";
var image2 = "images/skin_cancer2.png";
var paperTitle = "Skin Cancer Diagnosis Tool";
var descriptiom = "This UI lets users register an account along with their Doctor's information. The user can then either take new images or load images from the disk and the toolkit will run the diagnosis in the backend (based on pretrained AlexNet) and send the results directly to the doctor. The doctor makes the final diagnosis and consults the user.";
var publisherDetailsLinks =  `
              <a href="https://www.udg.edu/en/" target="_blank"><em>University of Girona</em></a>, Spain, 2017
              <br>
             [ <a href="https://github.com/tajwarabraraleef/Skin-Cancer-Diagnosis-Tool" target="_blank">Code</a> ]
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;


var imageId = "retina_image";
var image1 = "images/retina1.png";
var image2 = "images/retina2.png";
var paperTitle = "Macular Lesion classification and Retinal vessel segmentation";
var descriptiom = "In this work, first, a classification problem was tackled for classifying macular patches into three classes. Several deep learning approaches were studied including pre-trained models such as the AlexNet, VGG, GoogleNet, and resNet50. For Retinal vessel segmentation, a patch-based segmentation approach was used.";
var publisherDetailsLinks =  `
              <a href="https://www.udg.edu/en/" target="_blank"><em>University of Girona</em></a>, Spain, 2017
              <br>
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;


var imageId = "heart_image";
var image1 = "images/heart1.jpg";
var image2 = "images/heart.gif";
var paperTitle = "Heart flow analysis in ECG-gated cardiac Ultrasound";
var descriptiom = "Automatic spatio-temporal analysis of cardiac flow was performed using Lucas Kanade and Farneback optical flow techniques. This method tracks the ventricle wall and displays sparse and dense patterns of the vector field of the blood flow. Local and global maximum velocities of the flow are also calculated and displayed for each frame. If any vorticity is detected, it is displayed using colormaps.";
var publisherDetailsLinks =  `
                <a href="https://www.unicas.it/" target="_blank"><em>University of Cassino</em></a>, Italy, 2017
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;


var imageId = "thyroid_image";
var image1 = "images/thyroid1.png";
var image2 = "images/thyroid2.png";
var paperTitle = "Thyroid Nodule Segmentation";
var descriptiom = "In this work, several state-of-the-art image segmentation techniques were explored for optimizing Thyroid Nodule segmentation from Ultrasound images. This included supervised learning, transfer learning, and generative adversarial learning.";
var publisherDetailsLinks =  `
              <a href='https://tn-scui2020.grand-challenge.org/' target="_blank"><em>MICCAI TN-SCUI Challenge</em></a>, 2020
                            `;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById("tableBody").innerHTML += tableRowHTML;
