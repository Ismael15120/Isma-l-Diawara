import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// Contenu textuel de la page pour une gestion centralisée
const pageContent = {
    whatsappLink: "https://wa.me/22670392474?text=Bonjour%2C%20je%20suis%20intéressé%20par%20VITAL%20SHILAJIT%20et%20souhaiterais%20commander",
    hero: {
        headline: "Libérez l'Énergie Pure des Montagnes d'Altai",
        subheadline: "VITAL SHILAJIT est votre source de confiance pour un shilajit 100% authentique en Afrique de l'Ouest. Redécouvrez votre vitalité.",
        cta: "Commander via WhatsApp"
    },
    about: {
        title: "Qu'est-ce que le Shilajit ?",
        text: "Le Shilajit est une substance naturelle, résineuse et riche en nutriments, formée pendant des siècles par la décomposition de plantes dans les montagnes d'Altai. Connu comme le 'destructeur de faiblesse', il est une source puissante de plus de 84 minéraux et d'acide fulvique, essentiel pour l'absorption des nutriments."
    },
    benefits: {
        title: "Les Bienfaits de VITAL SHILAJIT",
        items: [
            {
                title: "Énergie & Endurance",
                description: "Combat la fatigue chronique et augmente vos performances physiques et mentales.",
                image: "/assets/benefit-energy.webp"
            },
            {
                title: "Fonction Cognitive",
                description: "Améliore la mémoire, la concentration et la clarté mentale.",
                image: "/assets/benefit-cognitive.webp"
            },
            {
                title: "Système Immunitaire",
                description: "Renforce vos défenses naturelles grâce à ses propriétés antioxydantes.",
                image: "/assets/benefit-immune.webp"
            },
            {
                title: "Anti-Âge & Régénération",
                description: "Favorise la régénération cellulaire pour une peau et un corps plus jeunes.",
                image: "/assets/benefit-aging.webp"
            },
            {
                title: "Équilibre Hormonal",
                description: "Contribue à réguler les hormones pour un bien-être général, hommes et femmes.",
                image: "/assets/benefit-balance.webp"
            }
        ]
    },
    product: {
        title: "Notre Produit : La Pureté Garantie",
        name: "VITAL SHILAJIT - Résine Pure d'Altai",
        description: "Chaque pot de 30g contient une résine de shilajit de la plus haute qualité, récoltée de manière durable et purifiée pour garantir sa sécurité et son efficacité. Sans additifs, sans conservateurs, juste la puissance de la nature.",
        cta: "Obtenir le Mien"
    },
    testimonials: {
        title: "Ce que disent nos clients",
        items: [
            {
                quote: "Depuis que je prends VITAL SHILAJIT, mon énergie le matin est incroyable. Je ne peux plus m'en passer !",
                author: "Adama K., Ouagadougou"
            },
            {
                quote: "Je me sens plus concentré au travail et moins stressé. Un produit vraiment exceptionnel.",
                author: "Fatoumata D., Bobo-Dioulasso"
            },
            {
                quote: "La qualité est incomparable. J'ai essayé d'autres marques, mais celle-ci est la meilleure de loin.",
                author: "Moussa S., Ouahigouya"
            }
        ]
    },
    process: {
        title: "Commander, c'est simple !",
        steps: [
            {
                name: "Contactez-nous",
                description: "Cliquez sur un bouton de commande pour ouvrir une discussion WhatsApp avec nous."
            },
            {
                name: "Confirmez",
                description: "Indiquez la quantité désirée et votre lieu de livraison. Nous vous confirmons le total."
            },
            {
                name: "Recevez",
                description: "Payez à la livraison ! Nous livrons rapidement à Ouagadougou et dans tout le Burkina Faso."
            }
        ]
    },
    footer: {
        company: "VITAL SHILAJIT",
        location: "Ouagadougou, Burkina Faso",
        rights: "Tous droits réservés."
    }
};

// --- Composants SVG ---

const MountainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17l6-6 4 4 8-8" />
        <path d="M4 17l4-4 4 4 4-4 4 4" />
    </svg>
);

const WhatsAppIcon = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.06.097-1.14 4.155 4.274-1.12z" />
    </svg>
);

const BenefitIcons = [
    () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>,
    () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 100 20 10 10 0 100-20z"/><path d="M12 12a4 4 0 100-8 4 4 0 100 8z"/><path d="M12 14a2 2 0 100-4 2 2 0 100 4z"/></svg>,
    () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
    () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>,
    () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
];

const ProcessIcons = [
    () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path></svg>,
    () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path></svg>,
    () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
];

// --- Composants de la Page ---

const Header = () => (
    <header className="header">
        <div className="container header__container">
            <a href="#" className="header__logo">
                <MountainIcon />
                <h1>VITAL SHILAJIT</h1>
            </a>
            <a href={pageContent.whatsappLink} className="cta cta--secondary" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} />
                <span>Contact</span>
            </a>
        </div>
    </header>
);

const Hero = () => (
    <section className="hero">
        <div className="hero__overlay"></div>
        <div className="container hero__container">
            <h2 className="hero__headline animate-on-scroll">{pageContent.hero.headline}</h2>
            <p className="hero__subheadline animate-on-scroll" style={{transitionDelay: '150ms'}}>{pageContent.hero.subheadline}</p>
            <a href={pageContent.whatsappLink} className="cta cta--primary animate-on-scroll" style={{transitionDelay: '300ms'}} target="_blank" rel="noopener noreferrer">
                {pageContent.hero.cta}
            </a>
        </div>
    </section>
);

const About = () => (
    <section className="about section">
        <div className="container about__container">
            <div className="about__svg-container animate-on-scroll">
               <svg className="mountain-draw" viewBox="0 0 500 150" preserveAspectRatio="xMidYMid meet">
                    <path d="M0,150 L100,50 L180,100 L250,30 L350,120 L420,80 L500,150 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
               </svg>
            </div>
            <h3 className="section__title animate-on-scroll">{pageContent.about.title}</h3>
            <p className="animate-on-scroll" style={{transitionDelay: '200ms'}}>{pageContent.about.text}</p>
        </div>
    </section>
);

const Benefits = () => (
    <section className="benefits section section--gray">
        <div className="container">
            <h3 className="section__title animate-on-scroll">{pageContent.benefits.title}</h3>
            <div className="benefits__list">
                {pageContent.benefits.items.map((item, index) => {
                    const Icon = BenefitIcons[index % BenefitIcons.length];
                    return (
                        <div className="benefit-item animate-on-scroll" key={index}>
                            <div className="benefit-item__image">
                                <img src={item.image} alt={item.title} loading="lazy" />
                            </div>
                            <div className="benefit-item__content">
                                <div className="benefit-item__icon"><Icon /></div>
                                <h4 className="benefit-item__title">{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

const ProductDetails = () => (
    <section className="product section">
        <div className="container product__container">
            <div className="product__image animate-on-scroll">
                <img src="/assets/product-jar.webp" alt="Pot de 30g de VITAL SHILAJIT" />
            </div>
            <div className="product__content animate-on-scroll" style={{transitionDelay: '200ms'}}>
                <h3 className="section__title">{pageContent.product.title}</h3>
                <h4>{pageContent.product.name}</h4>
                <p>{pageContent.product.description}</p>
                <a href={pageContent.whatsappLink} className="cta cta--primary" target="_blank" rel="noopener noreferrer">
                    {pageContent.product.cta}
                </a>
            </div>
        </div>
    </section>
);

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setActiveIndex((prevIndex) =>
                prevIndex === pageContent.testimonials.items.length - 1 ? 0 : prevIndex + 1
            ),
            7000
        );
        return () => {
            resetTimeout();
        };
    }, [activeIndex]);

    return (
        <section className="testimonials section section--gray">
            <div className="container">
                <h3 className="section__title animate-on-scroll">{pageContent.testimonials.title}</h3>
                <div className="carousel animate-on-scroll" style={{transitionDelay: '200ms'}}>
                    <div className="carousel__inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                        {pageContent.testimonials.items.map((item, index) => (
                            <div className="carousel__item" key={index}>
                                <p className="carousel__quote">"{item.quote}"</p>
                                <p className="carousel__author">- {item.author}</p>
                            </div>
                        ))}
                    </div>
                    <div className="carousel__indicators">
                        {pageContent.testimonials.items.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel__indicator ${index === activeIndex ? 'active' : ''}`}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const HowToOrder = () => (
    <section className="process section">
        <div className="container">
            <h3 className="section__title animate-on-scroll">{pageContent.process.title}</h3>
            <div className="process__grid">
                {pageContent.process.steps.map((step, index) => {
                     const Icon = ProcessIcons[index % ProcessIcons.length];
                    return(
                    <div className="process-step animate-on-scroll" key={index} style={{ transitionDelay: `${index * 150}ms` }}>
                        <div className="process-step__icon"><Icon /></div>
                        <h4 className="process-step__title">{index + 1}. {step.name}</h4>
                        <p>{step.description}</p>
                    </div>
                )})}
            </div>
        </div>
    </section>
);


const Footer = () => (
    <footer className="footer">
        <div className="container footer__container">
            <p>&copy; {new Date().getFullYear()} {pageContent.footer.company}. {pageContent.footer.rights}</p>
            <p>{pageContent.footer.location}</p>
        </div>
    </footer>
);

const WhatsAppButton = () => (
    <a href={pageContent.whatsappLink} className="whatsapp-button" aria-label="Contactez-nous sur WhatsApp" target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon size={32} />
    </a>
);


const App = () => {

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
        elementsToAnimate.forEach(el => observer.observe(el));

        const handleScroll = () => {
            const header = document.querySelector('.header');
            if (header) {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            elementsToAnimate.forEach(el => {
                if (el) observer.unobserve(el);
            });
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <Header />
            <main>
                <Hero />
                <About />
                <Benefits />
                <ProductDetails />
                <Testimonials />
                <HowToOrder />
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);