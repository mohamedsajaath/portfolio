document.addEventListener('DOMContentLoaded', () => {
    const sectionItems = document.querySelectorAll('.section-item');
    const rightSidebar = document.querySelector('.sidebar-right');
    const sidebarTitle = rightSidebar.querySelector('.sidebar-header h2');
    const settingsContent = rightSidebar.querySelector('.sidebar-content');
    const previewEl = document.getElementById('portfolio-preview');

    const settingsData = {
        'announcement-bar': {
            title: 'Announcement bar',
            settings: `
                <div class="settings-group">
                    <label for="announcement-text">Text</label>
                    <input type="text" id="announcement-text" value="📢 Currently available for Shopify projects!">
                </div>
                <div class="settings-group">
                    <label for="announcement-link">Link</label>
                    <input type="text" id="announcement-link" value="#contact">
                </div>
                <div class="settings-group">
                    <label>Colors</label>
                    <div class="color-swatches" role="group" aria-label="Color options">
                        <button class="swatch" aria-label="Shopify Blue" style="background: var(--shopify-blue); border:none;"></button>
                        <button class="swatch" aria-label="Black" style="background: #000; border:none;"></button>
                    </div>
                </div>
            `
        },
        'hero': {
            title: 'About Me',
            settings: `
                <div class="settings-group">
                    <label for="hero-heading">Heading</label>
                    <input type="text" id="hero-heading" value="Sajaath Mohamed">
                </div>
                <div class="settings-group">
                    <label for="hero-subheading">Subheading</label>
                    <textarea id="hero-subheading" rows="4">Certified Shopify Liquid Theme Developer with a passion for building fast, conversion-driven stores.</textarea>
                </div>
                <div class="settings-group">
                    <label for="hero-primary-btn">Primary Button</label>
                    <input type="text" id="hero-primary-btn" value="Let's talk">
                </div>
                <div class="settings-group">
                    <label for="hero-secondary-btn">Secondary Button</label>
                    <input type="text" id="hero-secondary-btn" value="Let's chat">
                </div>
            `
        },
        'tech-stack': {
            title: 'Tech Stack Slider',
            settings: `
                <div class="settings-group">
                    <label for="slider-speed">Animation Speed (s)</label>
                    <input type="number" id="slider-speed" value="30" min="10" max="100">
                </div>
                <div class="settings-group">
                    <label for="show-logo-names">Show Technology Names</label>
                    <input type="checkbox" id="show-logo-names" checked style="width: auto;">
                </div>
                <div class="settings-group">
                    <label>Logos</label>
                    <div style="font-size: 13px; color: #6d7175; margin-bottom: 8px;">Shopify, React, JS, HTML5, CSS3, Tailwind, Node, Figma, Git</div>
                    <button class="btn-secondary" style="width:100%;">Manage Logos</button>
                </div>
            `
        },
        'shopify-work': {
            title: 'Shopify Work',
            settings: `
                <div class="settings-group">
                    <label for="work-layout">List Layout</label>
                    <select id="work-layout" style="width:100%; padding:8px; border-radius:6px; border:1px solid #babfc3;">
                        <option>Grid (Small thumbnails)</option>
                        <option>Grid (Medium posters)</option>
                        <option>Showcase Slide</option>
                    </select>
                </div>
                <div class="settings-group">
                    <label>Stores</label>
                    <div style="font-size: 13px; color: #6d7175; margin-bottom: 8px;">12 stores added</div>
                    <button class="btn-secondary" style="width:100%;">Edit Stores</button>
                </div>
            `
        },
        'experience': {
            title: 'Experience & Education',
            settings: `
                <div class="settings-group">
                    <label for="show-timeline">Show Timeline</label>
                    <input type="checkbox" id="show-timeline" checked style="width: auto;">
                </div>
                <div class="settings-group">
                    <label>Items</label>
                    <div style="font-size: 13px; color: #6d7175; margin-bottom: 8px;">10 entries identified</div>
                    <button class="btn-secondary" style="width:100%;">Edit Entries</button>
                </div>
            `
        },
        'projects': {
            title: 'Featured Projects',
            settings: `
                <div class="settings-group">
                    <label for="projects-layout">Layout</label>
                    <select id="projects-layout" style="width:100%; padding:8px; border-radius:6px; border:1px solid #babfc3;">
                        <option>Grid (2 columns)</option>
                        <option>Grid (3 columns)</option>
                        <option>List</option>
                    </select>
                </div>
                <div class="settings-group">
                    <label for="show-project-desc">Show Project Descriptions</label>
                    <input type="checkbox" id="show-project-desc" checked style="width: auto;">
                </div>
                <button class="btn-secondary" style="width:100%;">Manage Projects</button>
            `
        },
        'skills': {
            title: 'Skills & Certs',
            settings: `
                <div class="settings-group">
                    <label>Certificates Style</label>
                    <div class="color-swatches" role="group" aria-label="Certificate styles">
                        <button class="swatch" aria-label="Light Gray" style="background: #f8f9fa; border:none;"></button>
                        <button class="swatch" aria-label="Light Orange" style="background: #fff3e0; border:none;"></button>
                    </div>
                </div>
                <div class="settings-group">
                    <label for="show-badges">HackerRank Badges</label>
                    <input type="checkbox" id="show-badges" checked style="width: auto;">
                </div>
            `
        },
        'agency': {
            title: 'Partner Agency',
            settings: `
                <div class="settings-group">
                    <label for="agency-layout">Display Layout</label>
                    <select id="agency-layout" style="width:100%; padding:8px; border-radius:6px; border-color: #babfc3;">
                        <option>Featured Card</option>
                        <option>Service Grid Only</option>
                    </select>
                </div>
                <div class="settings-group">
                    <label for="show-agency-badge">Show Official Badge</label>
                    <input type="checkbox" id="show-agency-badge" checked style="width: auto;">
                </div>
                <button class="btn-secondary" style="width:100%;">Edit Agency Profile</button>
            `
        },
        'reviews': {
            title: 'Reviews & Feedback',
            settings: `
                <div class="settings-group">
                    <label for="reviews-layout">Layout Style</label>
                    <select id="reviews-layout" style="width:100%; padding:8px; border-radius:6px; border-color: #babfc3;">
                        <option>Masonry Grid</option>
                        <option>Carousel</option>
                    </select>
                </div>
                <div class="settings-group">
                    <label for="show-verified-badge">Verified Badge</label>
                    <input type="checkbox" id="show-verified-badge" checked style="width: auto;">
                </div>
                <button class="btn-secondary" style="width:100%;">Import LinkedIn Recommendations</button>
            `
        },
        'footer': {
            title: 'Footer',
            settings: `
                <div class="settings-group">
                    <label for="copyright-text">Copyright</label>
                    <input type="text" id="copyright-text" value="© 2026 Sajaath Mohamed">
                </div>
                <div class="settings-group">
                    <label for="availability-text">Availability</label>
                    <input type="text" id="availability-text" value="Available Globally">
                </div>
            `
        }
    };

    const portfolioData = {
        'announcement-bar': `
            <div id="section-announcement-bar" class="p-section-wrapper">
                <div style="background: var(--shopify-blue); color: #fff; padding: 12px; border-radius: 8px 8px 0px 0px; text-align: center; margin-bottom: 20px; font-weight: 500; font-size: 14px;">
                    Currently available for Shopify projects! 
                    <a href="https://calendar.app.google/MLGtcMHiT1RNNzvs5" target="_blank" style="color: #fff; text-decoration: underline; margin-left: 10px;">Book a call →</a>
                </div>
            </div>
        `,
        'hero': `
            <div id="section-hero" class="p-section-wrapper">
                <div class="hero-content">
                    <div class="hero-image">
                        <img src="profile.png" alt="Sajaath Mohamed" itemprop="image">
                        <div class="member-badge">
                            <img src="images/SDA Member Light (PNG).png" alt="ShopDev Alliance Member" style="height: 22px; width: auto; object-fit: contain; border-radius: 0;">
                        </div>


                    </div>
                    <h1>Sajaath Mohamed</h1>
                    <p class="subtitle">Shopify Developer & Expert | Shopify Entwickler</p>


                    <p class="description">Experienced E-commerce Developer specializing in high-performance Shopify stores (Shopify Shops). Helping brands scale with custom Liquid themes and conversion-oriented development.</p>



                    <div class="hero-btns">
                        <a href="https://calendar.app.google/MLGtcMHiT1RNNzvs5" target="_blank" class="btn-main">
                            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" style="margin-right: 8px;"><path d="M6 3.5a.5.5 0 0 1 .5.5v.5h7V4a.5.5 0 0 1 1 0v.5h.5A1.5 1.5 0 0 1 16.5 6v9a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3.5 15V6A1.5 1.5 0 0 1 5 4.5h.5V4a.5.5 0 0 1 .5-.5ZM5 5.5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-.5V6a.5.5 0 0 1-1 0v-.5h-7V6a.5.5 0 0 1-1 0v-.5H5Z"/></svg>
                            Book a call
                        </a>
                        <a href="https://wa.me/94775265646" target="_blank" class="btn-sub btn-whatsapp">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="margin-right: 8px;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            WhatsApp
                        </a>
                    </div>

                </div>
            </div>
        `,
        'tech-stack': `
            <div id="section-tech-stack" class="p-section-wrapper" style="padding: 40px 0; background: #fff; overflow: hidden; border-bottom: 1px solid #f1f1f1;">
                <div class="tech-slider">
                    <div class="tech-track">
                        <!-- Logos repeated for infinite scroll -->
                        <div class="tech-item"><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/shopify.svg" alt="Shopify"><span>Shopify</span></div>
                        <div class="tech-item"><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/javascript.svg" alt="JavaScript"><span>JavaScript</span></div>
                        <div class="tech-item"><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/html5.svg" alt="HTML5"><span>HTML5</span></div>
                        <div class="tech-item"><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nodedotjs.svg" alt="Node.js"><span>Node.js</span></div>
                        <div class="tech-item"><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/figma.svg" alt="Figma"><span>Figma</span></div>
                        <div class="tech-item"><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/git.svg" alt="Git"><span>Git</span></div>
                        <div class="tech-item"><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/make.svg" alt="Make.com"><span>Make.com</span></div>
                        
                        <!-- Repeat -->
                        <div class="tech-item"><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/shopify.svg" alt="Shopify"><span>Shopify</span></div>
                        <div class="tech-item"><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/javascript.svg" alt="JavaScript"><span>JavaScript</span></div>
                        <div class="tech-item"><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/html5.svg" alt="HTML5"><span>HTML5</span></div>
                        <div class="tech-item"><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nodedotjs.svg" alt="Node.js"><span>Node.js</span></div>
                        <div class="tech-item"><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/figma.svg" alt="Figma"><span>Figma</span></div>
                        <div class="tech-item"><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/git.svg" alt="Git"><span>Git</span></div>
                        <div class="tech-item"><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/make.svg" alt="Make.com"><span>Make.com</span></div>
                    </div>
                </div>
            </div>
        `,
        'shopify-work': `
            <div id="section-shopify-work" class="p-section-wrapper">
                <h2 style="font-size: 28px; margin-bottom: 32px; border-bottom: 2px solid #f1f1f1; padding-bottom: 12px; margin-top: 90px; text-align: center;">Shopify Stores I've Worked</h2>
                <div class="skills-grid" style="grid-template-columns: repeat(3, 1fr);">
                    <div class="skill-card">
                        <div class="shop-thumbnail">
                            <img src="images/fingersscrossed.png" alt="Fingerscrossed">
                        </div>
                        <h3>Fingerscrossed</h3>
                        <a href="https://fingerscrossed.design/" target="_blank" class="view-link">View Store →</a>
                    </div>
                    <div class="skill-card">
                        <div class="shop-thumbnail">
                            <img src="images/kbs.png" alt="KBS">
                        </div>
                        <h3>KBS - Welt der Steine</h3>
                        <a href="https://kbs-shop.com/" target="_blank" class="view-link">View Store →</a>
                    </div>
                    <div class="skill-card">
                        <div class="shop-thumbnail">
                            <img src="images/littlecub.png" alt="Littlecub">
                        </div>
                        <h3>Littlecub</h3>
                        <a href="https://littlecub.de/" target="_blank" class="view-link">View Store →</a>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 40px;">
                    <a href="pages/all-stores.html" class="btn-sub" style="display: inline-block;">View More Stores</a>
                </div>
            </div>
        `,


        'projects': `
            <div id="section-projects" class="p-section-wrapper">
                <h2 style="font-size: 28px; margin-bottom: 32px; border-bottom: 2px solid #f1f1f1; padding-bottom: 12px; margin-top: 60px; text-align: center;">Other Projects</h2>
                
                <div class="project-list-modern">
                    <!-- WebScale -->
                    <a href="https://chromewebstore.google.com/detail/webscale/pambnkdlnjdlomhkamnfokbccbjlebam" target="_blank" class="project-modern-card">
                        <div class="project-icon-box">
                            <img src="images/WebScale-icon-active.png" alt="WebScale">
                        </div>
                        <div class="project-info">
                            <div class="project-header">
                                <h3 class="project-title">WebScale (Chrome Extension)</h3>
                                <span class="project-date">Jan 2026 - Present</span>
                            </div>
                            <p class="project-desc">A free Chrome extension designed for developers and SEO experts to inspect web elements and understand heading hierarchy.</p>
                            <div class="project-tags">
                                <span class="project-tag">JavaScript</span>
                                <span class="project-tag">Open-Source</span>
                                <span class="project-tag">Tools</span>
                            </div>
                        </div>
                    </a>

                    <!-- SteelWall -->
                    <a href="https://steelwall.eu/" target="_blank" class="project-modern-card">
                        <div class="project-icon-box">
                            <img src="images/steelwall.png" alt="SteelWall">
                        </div>
                        <div class="project-info">
                            <div class="project-header">
                                <h3 class="project-title">SteelWall (CMS Revamp)</h3>
                                <span class="project-date">Feb 2024 - Apr 2025</span>
                            </div>
                            <p class="project-desc">Full-stack development contribution for revamping a specialized focus content management system.</p>
                            <div class="project-tags">
                                <span class="project-tag">PHP</span>
                                <span class="project-tag">CMS Development</span>
                                <span class="project-tag">SEO</span>
                            </div>
                        </div>
                    </a>

                    <!-- Onres24 -->
                    <a href="https://onres24.net/" target="_blank" class="project-modern-card">
                        <div class="project-icon-box">
                            <img src="images/onres.png" alt="Onres24">
                        </div>
                        <div class="project-info">
                            <div class="project-header">
                                <h3 class="project-title">Onres24 (Aviation Management)</h3>
                                <span class="project-date">Oct 2023 - Jan 2025</span>
                            </div>
                            <p class="project-desc">Ensuring smooth operations and implementing upgrades for a comprehensive aviation management system.</p>
                            <div class="project-tags">
                                <span class="project-tag">Back-End</span>
                                <span class="project-tag">PHP</span>
                            </div>
                        </div>
                    </a>

                    <!-- Woblu -->
                    <a href="https://woblu.de/" target="_blank" class="project-modern-card">
                        <div class="project-icon-box">
                            <img src="images/Woblu-Logo-header-2048x515-1-1024x258.png" alt="Woblu">
                        </div>
                        <div class="project-info">
                            <div class="project-header">
                                <h3 class="project-title">Woblu (Maintenance App)</h3>
                                <span class="project-date">Nov 2023 - Jan 2025</span>
                            </div>
                            <p class="project-desc">API development for a mobile application connecting properties, tenants, and maintenance personnel.</p>
                            <div class="project-tags">
                                <span class="project-tag">Node.js</span>
                                <span class="project-tag">API Development</span>
                            </div>
                        </div>
                    </a>



                    <!-- Python Automation -->
                    <div class="project-modern-card">
                        <div class="project-icon-box">
                             <img src="images/Python.png" alt="Python Automation">
                        </div>
                        <div class="project-info">
                            <div class="project-header">
                                <h3 class="project-title">Python Inventory Automation</h3>
                                <span class="project-date">Sep 2023 - Oct 2023</span>
                            </div>
                            <p class="project-desc">Selenium-based automation system for inventory management with CSV processing and SMTP reporting.</p>
                            <div class="project-tags">
                                <span class="project-tag">Python</span>
                                <span class="project-tag">Selenium</span>
                                <span class="project-tag">Automation</span>
                            </div>
                        </div>
                    </div>
                </div>



                <h3 style="font-size: 20px; margin-top: 50px; margin-bottom: 20px;">Web Experiments & UI Designs</h3>
                <div class="project-grid-mini">
                    <a href="https://mohamedsajaath.github.io/3dBall/" target="_blank" class="mini-card">
                        <h4>3D Ball</h4>
                        <p>Visually captivating interactive 3D ball project.</p>
                    </a>
                    <a href="https://mohamedsajaath.github.io/space/" target="_blank" class="mini-card">
                        <h4>Model Space</h4>
                        <p>Solar system exploration in HTML/CSS/JS.</p>
                    </a>
                    <a href="https://mohamedsajaath.github.io/mario_run/" target="_blank" class="mini-card">
                        <h4>Mario Run</h4>
                        <p>Fun JS-based browser game mechanics.</p>
                    </a>
                    <a href="https://quranline.github.io/player/" target="_blank" class="mini-card">
                        <h4>Quran Player</h4>
                        <p>High-quality audio recitations with themes.</p>
                    </a>
                     <a href="https://mohamedsajaath.github.io/cube/" target="_blank" class="mini-card">
                        <h4>3D Cube</h4>
                        <p>Interactive graphics with CSS & Vanilla JS.</p>
                    </a>
                </div>
            </div>
        `,

        'experience': `
            <div id="section-experience" class="p-section-wrapper">
                <h2 style="font-size: 24px; margin-bottom: 24px; border-bottom: 2px solid #f1f1f1; padding-bottom: 8px; margin-top: 40px; text-align: center;">Professional Experience</h2>
                <div class="timeline">
                    <div class="timeline-item left">
                        <div class="timeline-content">
                            <div class="time">Jan 2022 - Present</div>
                            <div class="role">Software Developer</div>
                            <div class="company">Solutionitcs • Sri Lanka</div>
                            <p style="font-size: 13px; color: #666; line-height: 1.5; margin-top: 8px;">Architected and launched WebScale, a productivity extension for web analysis and SEO optimization.</p>
                        </div>
                    </div>
                    <div class="timeline-item right">
                        <div class="timeline-content">
                            <div class="time">June 2025 - Present</div>
                            <div class="role">Shopify Developer</div>
                            <div class="company">Scale Solutions • Germany</div>
                            <p style="font-size: 13px; color: #666; line-height: 1.5; margin-top: 8px;">Liquid theme development and Shopify Plus store optimizations focused on international growth.</p>
                        </div>
                    </div>
                 
                    <!-- Hidden Items Container -->
                    <div id="more-experience" style="display: none; width: 100%;">
                         <div class="timeline-item left">
                            <div class="timeline-content">
                                <div class="time">October 2023 - May 2025</div>
                                <div class="role">Software Developer</div>
                                <div class="company">BayLanka Technologies • Sri Lanka</div>
                                <p style="font-size: 13px; color: #666; line-height: 1.5; margin-top: 8px;">Driving full-stack development across client projects, specializing in performance and custom tools.</p>
                            </div>
                        </div>
                        <div class="timeline-item right">
                            <div class="timeline-content">
                                <div class="time">May 2024 - May 2025</div>
                                <div class="role">Shopify Storefront Dev</div>
                                <div class="company">Eshop Guide • Germany</div>
                                <p style="font-size: 13px; color: #666; line-height: 1.5; margin-top: 8px;">Specialized in complex store migrations and custom Liquid architecture for high-revenue merchants.</p>
                            </div>
                        </div>
                        <div class="timeline-item left">
                            <div class="timeline-content">
                                <div class="time">Sep 2021 - Jan 2022</div>
                                <div class="role">Software Developer Trainee -> Software Developer</div>
                                <div class="company">Imara Software Solution • Sri Lanka</div>
                                <p style="font-size: 13px; color: #666; line-height: 1.5; margin-top: 8px;">Gained foundational experience in web technologies and contributed to frontend development tasks.</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div style="text-align: center; margin-top: 20px;">
                    <button id="toggle-exp-btn" class="btn-sub" onclick="toggleExperience()">View All Experience</button>
                </div>
            </div>
        `,





        'skills': `
            <div id="section-skills" class="p-section-wrapper">
                <div class="skills-container">
                    <h2 style="font-size: 24px; margin-bottom: 24px; border-bottom: 2px solid #f1f1f1; padding-bottom: 8px; margin-top: 60px; text-align: center;">Expertise & Credentials</h2>
                    
                    <div class="skills-cloud">
                        <span class="skill-tag">Shopify Liquid</span>
                        <span class="skill-tag">React.js</span>
                        <span class="skill-tag">PHP</span>
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">SQL</span>
                        <span class="skill-tag">Figma</span>
                        <span class="skill-tag">Automation (Make)</span>
                        <span class="skill-tag">UI/UX Design</span>
                        <span class="skill-tag">GitHub</span>
                    </div>

                    <div class="cert-filter-tabs" id="cert-tabs" role="tablist" aria-label="Certificate filters">
                        <button class="cert-tab active" role="tab" aria-selected="true" data-filter="all" onclick="filterCerts('all')">All</button>
                        <button class="cert-tab" role="tab" aria-selected="false" data-filter="shopify" onclick="filterCerts('shopify')">Shopify</button>
                        <button class="cert-tab" role="tab" aria-selected="false" data-filter="development" onclick="filterCerts('development')">Development</button>
                        <button class="cert-tab" role="tab" aria-selected="false" data-filter="design" onclick="filterCerts('design')">Design & AI</button>
                    </div>

                    <div class="cert-grid" id="cert-registry">
                        <div class="cert-card-modern" data-category="shopify">
                            <div class="cert-issuer-icon" style="background: #E6F5F0; color: #008060; font-weight: 800; font-size: 14px;">S</div>
                            <div class="cert-info">
                                <div class="cert-title">Shopify Dev Fundamentals</div>
                                <div class="cert-meta">Shopify • Issued Jul 2025</div>
                                <div class="cert-skills"><span class="cert-skill-tag">Shopify</span></div>
                            </div>
                        </div>
                        <div class="cert-card-modern" data-category="shopify">
                            <div class="cert-issuer-icon" style="background: #E6F5F0; color: #008060; font-weight: 800; font-size: 14px;">S</div>
                            <div class="cert-info">
                                <div class="cert-title">Solution Planning Fundamentals</div>
                                <div class="cert-meta">Shopify • Issued Jul 2025</div>
                                <div class="cert-skills"><span class="cert-skill-tag">Shopify</span></div>
                            </div>
                        </div>
                        <div class="cert-card-modern" data-category="shopify">
                            <div class="cert-issuer-icon" style="background: #E6F5F0; color: #008060; font-weight: 800; font-size: 14px;">S</div>
                            <div class="cert-info">
                                <div class="cert-title">Liquid Storefronts for Theme Developers</div>
                                <div class="cert-meta">Shopify • Issued Jun 2025</div>
                                <div class="cert-skills"><span class="cert-skill-tag">Liquid</span></div>
                            </div>
                        </div>
                        <div class="cert-card-modern" data-category="development">
                            <div class="cert-issuer-icon" style="background: #E6F2F7; color: #0077B5; font-weight: 800; font-size: 14px;">in</div>
                            <div class="cert-info">
                                <div class="cert-title">React Essential Training</div>
                                <div class="cert-meta">LinkedIn • Issued May 2025</div>
                                <div class="cert-skills"><span class="cert-skill-tag">React.js</span></div>
                            </div>
                        </div>
                        <div class="cert-card-modern" data-category="development">
                            <div class="cert-issuer-icon" style="background: #FEE7E9; color: #A435F0; font-weight: 800; font-size: 14px;">U</div>
                            <div class="cert-info">
                                <div class="cert-title">Shopify Liquid Programming</div>
                                <div class="cert-meta">Udemy • Issued May 2025</div>
                                <div class="cert-skills"><span class="cert-skill-tag">Liquid</span></div>
                            </div>
                        </div>
                         <div class="cert-card-modern" data-category="design">
                            <div class="cert-issuer-icon" style="background: #E6F2F7; color: #0073B1; font-weight: 800; font-size: 14px;">M</div>
                            <div class="cert-info">
                                <div class="cert-title">Make Advanced - Automation</div>
                                <div class="cert-meta">Make • Issued Dec 2024</div>
                                <div class="cert-skills"><span class="cert-skill-tag">Automation</span></div>
                            </div>
                        </div>
                        <div class="cert-card-modern" data-category="development">
                            <div class="cert-issuer-icon" style="background: #F4E6F7; color: #7B1FA2; font-weight: 800; font-size: 14px;">S</div>
                            <div class="cert-info">
                                <div class="cert-title">PHP Advanced</div>
                                <div class="cert-meta">Sololearn • Issued Oct 2023</div>
                                <div class="cert-skills"><span class="cert-skill-tag">PHP</span><span class="cert-skill-tag">OOP</span></div>
                            </div>
                        </div>
                        <div class="cert-card-modern" data-category="design">
                            <div class="cert-issuer-icon" style="background: #EBEEF0; color: #0269D0; font-weight: 800; font-size: 14px;">IBM</div>
                            <div class="cert-info">
                                <div class="cert-title">Build Your Own Chatbot</div>
                                <div class="cert-meta">IBM • Issued Sep 2022</div>
                                <div class="cert-skills"><span class="cert-skill-tag">AI</span></div>
                            </div>
                        </div>
                        <div class="cert-card-modern" data-category="development">
                            <div class="cert-issuer-icon" style="background: #EBEEF0; color: #0A0A23; font-weight: 800; font-size: 12px;">fCC</div>
                            <div class="cert-info">
                                <div class="cert-title">Responsive Web Design</div>
                                <div class="cert-meta">freeCodeCamp • Issued Mar 2022</div>
                                <div class="cert-skills"><span class="cert-skill-tag">CSS</span><span class="cert-skill-tag">HTML</span></div>
                            </div>
                        </div>
                        <div class="cert-card-modern" data-category="design">
                            <div class="cert-issuer-icon" style="background: #E6F2F7; color: #0073B1; font-weight: 800; font-size: 14px;">C</div>
                            <div class="cert-info">
                                <div class="cert-title">Figma Car App Project</div>
                                <div class="cert-meta">Coursera • Issued May 2022</div>
                                <div class="cert-skills"><span class="cert-skill-tag">Figma</span></div>
                            </div>
                        </div>
                        <div class="cert-card-modern" data-category="development">
                            <div class="cert-issuer-icon" style="background: #E6F7F0; color: #27AE60; font-weight: 800; font-size: 14px;">S</div>
                            <div class="cert-info">
                                <div class="cert-title">SQL Fundamentals</div>
                                <div class="cert-meta">Sololearn • Issued Aug 2022</div>
                                <div class="cert-skills"><span class="cert-skill-tag">SQL</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,

        'agency': `
            <div id="section-agency" class="p-section-wrapper">
                <h2 style="font-size: 28px; margin-bottom: 32px; border-bottom: 2px solid #f1f1f1; padding-bottom: 12px; margin-top: 90px; text-align: center;">Partner Shopify Agency</h2>
                
                <div class="agency-feature-card">
                    <div class="agency-badge">Official Partner</div>
                    <div class="agency-logo-wrapper">
                        <img src="images/scalesolutions.svg" alt="Scale Solutions Logo">
                    </div>
                    <h3 style="font-size: 24px; color: #1a1a1a; margin-bottom: 16px;">Scale Solutions - Munich, Germany</h3>
                    <p style="color: #637381; font-size: 12px; line-height: 1.6; max-width: 600px; margin-bottom: 32px;">
                        I am proud to be part of Scale Solutions, a premier German agency specializing in predictable growth for Shopify brands. We blend high-end development with performance-marketing to scale businesses efficiently and sustainably.
                    </p>

                    <div class="agency-services-grid">
                        <div class="agency-service-item">
                            <div class="agency-service-title">UI/UX Design</div>
                            <div class="agency-service-desc">Conversion-focused interface design tailored for e-commerce excellence.</div>
                        </div>
                        <div class="agency-service-item">
                            <div class="agency-service-title">Shopify Development</div>
                            <div class="agency-service-desc">Custom theme development and complex app integrations for high-scale stores.</div>
                        </div>
                        <div class="agency-service-item">
                            <div class="agency-service-title">Growth Marketing</div>
                            <div class="agency-service-desc">Data-driven performance marketing to acquire and retain high-value customers.</div>
                        </div>
                    </div>

                    <div class="hero-btns">
                        <a href="https://scalesolutions.de/" target="_blank" class="btn-main">
                            Visit Agency Website →
                        </a>
                    </div>
                </div>
            </div>
        `,


        'reviews': `
            <div id="section-reviews" class="p-section-wrapper">
                <h2 style="font-size: 28px; margin-bottom: 32px; border-bottom: 2px solid #f1f1f1; padding-bottom: 12px; margin-top: 90px; text-align: center;">Partner Feedback & Endorsements</h2>
                
                <div class="reviews-container">
                    <div class="reviews-filter-tabs" role="tablist" aria-label="Review type filters">
                        <button class="review-tab active" role="tab" aria-selected="true" onclick="switchReviewTab('recommendations')">Recommendations</button>
                        <button class="review-tab" role="tab" aria-selected="false" onclick="switchReviewTab('reviews')">Reviews</button>
                    </div>

                    <div id="recommendations-content" class="recommendations-grid">
                        <!-- Oliver Schönbett -->
                        <div class="recommendation-card">
                            <div class="recommender-header">
                                <div class="recommender-avatar">
                                    <img src="images/oliver.jpeg" alt="Oliver Schönbett">
                                </div>
                                <div class="recommender-info">
                                    <div class="recommender-name">Oliver Schönbett </div>
                                    <div class="recommender-title">Founder & IT Strategist • Germany</div>
                                </div>
                            </div>
                            <div class="recommendation-text">
                                "Sajaath is a very responsible developer who pays extreme attention to detail. He is a versatile and horizontally skilled Shopify Frontend expert. I really enjoyed our collaboration on several frontend projects."
                            </div>
                        </div>

                        <!-- Patricia Kats -->
                        <div class="recommendation-card">
                            <div class="recommender-header">
                                <div class="recommender-avatar">
                                    <img src="images/patricia.jpeg" alt="Patricia Kats">
                                </div>
                                <div class="recommender-info">
                                    <div class="recommender-name">Patricia Kats </div>
                                    <div class="recommender-title">E-Commerce Project Manager • Germany</div>
                                </div>
                            </div>
                            <div class="recommendation-text">
                                "His structured approach, technical expertise, and clear communication made the collaboration smooth and effective. A reliable partner I’d be happy to work with again."
                            </div>
                        </div>

                        <!-- Dr. Markus Lehmann -->
                        <div class="recommendation-card">
                            <div class="recommender-header">
                                <div class="recommender-avatar">
                                    <img src="images/markus.jpeg" alt="Dr. Markus Lehmann">
                                </div>
                                <div class="recommender-info">
                                    <div class="recommender-name">Dr. Markus Lehmann </div>
                                    <div class="recommender-title">CEO & Software Architect • Germany</div>
                                </div>
                            </div>
                            <div class="recommendation-text">
                                "Sajaath excels as a software developer, showcasing an open-minded approach and a rapid learning curve. I highly appreciate his work and dedication to excellence."
                            </div>
                        </div>

                        <!-- Ishthiyaque Ahmed -->
                        <div class="recommendation-card">
                            <div class="recommender-header">
                                <div class="recommender-avatar">
                                    <img src="images/isthiyaque.jpeg" alt="Ishthiyaque Ahmed">
                                </div>
                                <div class="recommender-info">
                                    <div class="recommender-name">Ishthiyaque Ahmed </div>
                                    <div class="recommender-title">Automation Strategist • Sri Lanka</div>
                                </div>
                            </div>
                            <div class="recommendation-text">
                                "Sajaath is a dynamic person who could capture any technology faster and always over-delivers. He has sound theoretical knowledge and is a valuable asset to any team."
                            </div>
                        </div>

                        <!-- Mohamed Ajhar -->
                        <div class="recommendation-card">
                            <div class="recommender-header">
                                <div class="recommender-avatar">
                                    <img src="images/ajhar.jpeg" alt="Mohamed Ajhar">
                                </div>
                                <div class="recommender-info">
                                    <div class="recommender-name">Mohamed Ajhar </div>
                                    <div class="recommender-title">Software Engineer • Sri Lanka</div>
                                </div>
                            </div>
                            <div class="recommendation-text">
                                "Sajaath's commitment to excellence and proactive approach make him a standout team member. His passion for continuous learning is evident in his ability to adapt effectively."
                            </div>
                        </div>

                        <!-- Mohamed Faalil -->
                        <div class="recommendation-card">
                            <div class="recommender-header">
                                <div class="recommender-avatar">
                                    <img src="images/faalil.png" alt="Mohamed Faalil">
                                </div>
                                <div class="recommender-info">
                                    <div class="recommender-name">Mohamed Faalil </div>
                                    <div class="recommender-title">Senior Software Engineer • Germany</div>
                                </div>
                            </div>
                            <div class="recommendation-text">
                                "An exceptional developer who combines rapid learning with a strong commitment to engineering best practices. His dedication and adaptability make him an asset to any company."
                            </div>
                        </div>

                        <!-- Rajabdeen Ajmal -->
                        <div class="recommendation-card">
                            <div class="recommender-header">
                                <div class="recommender-avatar">
                                    <img src="images/ajmal.jpeg" alt="Rajabdeen Ajmal">
                                </div>
                                <div class="recommender-info">
                                    <div class="recommender-name">Rajabdeen Ajmal </div>
                                    <div class="recommender-title">Senior Technical Lead • Sri Lanka</div>
                                </div>
                            </div>
                            <div class="recommendation-text">
                                "Sajaath is an excellent front-end developer who delivered so many eye-catching and elegant solutions."
                            </div>
                        </div>
                    </div>

                    <div id="reviews-content" class="recommendations-grid" style="display: none;">
                        <div class="empty-reviews-state">
                            <div style="font-size: 40px; margin-bottom: 20px;">⭐</div>
                            <h3>No Direct Reviews Yet</h3>
                            <p>Direct platform reviews are coming soon. In the meantime, please check out my professional endorsements from LinkedIn!</p>
                        </div>
                    </div>
                </div>
            </div>
        `,

        'footer': `
            <div id="section-footer" class="p-section-wrapper">
                <div class="footer-container">
                    <div class="footer-top">
                        <div style="font-size: 12px; color: var(--shopify-blue); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;">Available Globally</div>
                        <h2>Let's build something<br>exceptional together.</h2>
                        
                        <div class="footer-social">
                            <a href="https://www.linkedin.com/in/sajaathmohamed" target="_blank" class="social-icon-link" title="LinkedIn" aria-label="Follow me on LinkedIn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                            <a href="https://github.com/mohamedsajaath" target="_blank" class="social-icon-link" title="GitHub" aria-label="Check my projects on GitHub">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                            <a href="https://www.instagram.com/sajaath.mohamed/" target="_blank" class="social-icon-link" title="Instagram" aria-label="Follow me on Instagram">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="https://web.facebook.com/profile.php?id=61569993419912" target="_blank" class="social-icon-link" title="Facebook" aria-label="Follow me on Facebook">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>
                            <a href="https://wa.me/94775265646" target="_blank" class="social-icon-link" title="WhatsApp" aria-label="Contact me on WhatsApp">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            </a>
                            <a href="mailto:mohamedsajaath0409@gmail.com" class="social-icon-link" title="Email" aria-label="Send me an email">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </a>
                        </div>



                        <div class="hero-btns" style="justify-content: center;">
                            <a href="https://calendar.app.google/MLGtcMHiT1RNNzvs5" target="_blank" class="btn-main">Work with me</a>
                        </div>
                    </div>

                    <div class="footer-bottom">
                        <div>© 2026 Sajaath Mohamed — Built with Passion</div>
                        <div class="footer-info">
                            <span class="footer-link">Puttalam District, LK</span>
                            <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-end;">
                                <a href="mailto:sajaath.mohamed@scalesolutions.de" class="footer-link">sajaath.mohamed@scalesolutions.de</a>
                                <a href="mailto:mohamedsajaath0409@gmail.com" class="footer-link">mohamedsajaath0409@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

    };

    function initPreview() {
        previewEl.innerHTML = '';
        Object.keys(portfolioData).forEach(id => {
            const wrapper = document.createElement('div');
            wrapper.className = 'canvas-section';
            wrapper.dataset.sectionId = id;
            wrapper.setAttribute('tabindex', '0');
            wrapper.setAttribute('role', 'button');
            wrapper.setAttribute('aria-label', `Edit ${id.replace('-', ' ')} section`);
            wrapper.innerHTML = portfolioData[id];
            previewEl.appendChild(wrapper);

            const selectSection = (e) => {
                e.stopPropagation();
                switchSection(id);
            };

            wrapper.addEventListener('click', selectSection);
            wrapper.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectSection(e);
                }
            });
        });
    }

    function typeWriter(element, text, speed = 20) {
        element.innerHTML = '';
        element.classList.add('typing');
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing');
            }
        }
        type();
    }

    function switchSection(id) {
        sectionItems.forEach(item => item.classList.remove('active'));
        const activeItem = document.querySelector(`.section-item[data-section="${id}"]`);
        if (activeItem) activeItem.classList.add('active');

        if (settingsData[id]) {
            sidebarTitle.textContent = settingsData[id].title;
            settingsContent.innerHTML = settingsData[id].settings;
        }

        const targetSection = document.querySelector(`.canvas-section[data-section-id="${id}"]`);
        if (targetSection) {
            document.querySelectorAll('.canvas-section').forEach(s => s.classList.remove('canvas-active'));
            targetSection.classList.add('canvas-active');
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Trigger typing effect for hero
            if (id === 'hero') {
                const desc = targetSection.querySelector('.description');
                const fullText = "Certified Shopify Liquid Theme Developer with a passion for building fast, conversion-driven, and fully customizable Shopify stores. Experienced in translating Figma designs into pixel-perfect Liquid themes, optimizing performance, and delivering scalable solutions tailored for real-world e-commerce growth.";
                if (desc) {
                    // Delay to wait for the container's entrance animation
                    setTimeout(() => {
                        typeWriter(desc, fullText);
                    }, 800);
                }
            }
        }
    }


    sectionItems.forEach(item => {
        const handleAction = (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            if (sectionId) switchSection(sectionId);
        };
        item.addEventListener('click', handleAction);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handleAction(e);
            }
        });
    });

    const deviceBtns = document.querySelectorAll('.device-switcher button');
    const previewFrame = document.querySelector('.preview-frame');
    deviceBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            deviceBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            previewFrame.style.maxWidth = index === 1 ? '375px' : '1000px';

            if (previewFrame.style.maxWidth === '375px') {
                previewFrame.classList.add('mobile');
            } else {
                previewFrame.classList.remove('mobile');
            }
        });
    });

    initPreview();
    switchSection('hero');

    const saveBtn = document.querySelector('.btn-primary');
    saveBtn.addEventListener('click', () => {
        const originalText = saveBtn.textContent;
        saveBtn.textContent = 'Saving...';
        saveBtn.style.opacity = '0.7';
        setTimeout(() => {
            saveBtn.textContent = 'Saved!';
            saveBtn.style.background = '#008060';
            setTimeout(() => {
                saveBtn.textContent = originalText;
                saveBtn.style.background = 'var(--shopify-blue)';
                saveBtn.style.opacity = '1';
            }, 2000);
        }, 1200);
    });

    window.toggleExperience = function () {
        const moreExp = document.getElementById('more-experience');
        const btn = document.getElementById('toggle-exp-btn');
        if (moreExp.style.display === 'none') {
            moreExp.style.display = 'block';
            btn.textContent = 'View Less';
        } else {
            moreExp.style.display = 'none';
            btn.textContent = 'View All Experience';
        }
    };

    window.filterCerts = function (category) {
        const grid = document.getElementById('cert-registry');
        if (!grid) return;
        const cards = grid.querySelectorAll('.cert-card-modern');
        const tabs = document.querySelectorAll('.cert-tab');

        tabs.forEach(tab => {
            if (tab.getAttribute('data-filter') === category) {
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
            } else {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            }
        });

        cards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.4s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    };

    window.switchReviewTab = function (tab) {
        const recContent = document.getElementById('recommendations-content');
        const revContent = document.getElementById('reviews-content');
        const tabs = document.querySelectorAll('.review-tab');

        if (tab === 'recommendations') {
            if (recContent) recContent.style.display = 'grid';
            if (revContent) revContent.style.display = 'none';
            if (tabs[0]) {
                tabs[0].classList.add('active');
                tabs[0].setAttribute('aria-selected', 'true');
            }
            if (tabs[1]) {
                tabs[1].classList.remove('active');
                tabs[1].setAttribute('aria-selected', 'false');
            }
        } else {
            if (recContent) recContent.style.display = 'none';
            if (revContent) revContent.style.display = 'grid';
            if (tabs[0]) {
                tabs[0].classList.remove('active');
                tabs[0].setAttribute('aria-selected', 'false');
            }
            if (tabs[1]) {
                tabs[1].classList.add('active');
                tabs[1].setAttribute('aria-selected', 'true');
            }
        }
    };
});


