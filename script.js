document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('portfolio-theme', next);
        });
    }

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
                    <input type="text" id="hero-heading" value="th Mohamed">
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
                <div class="settings-group">
                    <label for="hero-rating">Trustpilot Rating (1-5)</label>
                    <input type="number" id="hero-rating" value="4" min="1" max="5" step="1">
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
                <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">Shopify, React, JS, HTML5, CSS3, Tailwind, Node, Figma, Git</div>
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
                <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">12 stores added</div>
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
                <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">10 entries identified</div>
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
        'articles': {
            title: 'Articles & Insights',
            settings: `
                <div class="settings-group">
                    <label for="article-layout">Layout</label>
                    <select id="article-layout" style="width:100%; padding:8px; border-radius:6px; border:1px solid #babfc3;">
                        <option>Cards Grid</option>
                        <option>Compact List</option>
                        <option>Featured Highlight</option>
                    </select>
                </div>
                <div class="settings-group">
                    <label for="show-article-date">Show Publication Date</label>
                    <input type="checkbox" id="show-article-date" checked style="width: auto;">
                </div>
                <button class="btn-secondary" style="width:100%;">Import from LinkedIn</button>
            `
        },
        'virtual-office': {
            title: 'Virtual Office',
            settings: `
                <div class="settings-group">
                    <label for="office-status">Live Status Override</label>
                    <select id="office-status" style="width:100%; padding:8px; border-radius:6px; border:1px solid #babfc3;">
                        <option>Automatic (Based on Schedule)</option>
                        <option>Force Live</option>
                        <option>Force Offline</option>
                    </select>
                </div>
                <button class="btn-secondary" style="width:100%;">Update Office Timings</button>
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
                    <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/mohamedsajaath0409/30min'});return false;" style="color: #fff; text-decoration: underline; margin-left: 10px;">Book a call →</a>
                </div>
            </div>
        `,
        'hero': `
            <div id="section-hero" class="p-section-wrapper">
                <div class="hero-content">
                    <div class="hero-image">
                        <img src="sajaath_mohamed.jpg" alt="Sajaath Mohamed" itemprop="image">
                        <div class="star-on-profile" id="profile-star">
                            <svg viewBox="0 0 20 20" width="32" height="32" fill="currentColor">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                        </div>
                        
                        <div class="hero-score-badge" onclick="window.addStarToProfile(event)">
                            <div class="score-stars">
                                <div class="star-unit"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                <div class="star-unit"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                <div class="star-unit"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                <div class="star-unit"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                <div class="star-unit empty"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                            </div>
                            <div class="score-label">Trustpilot Rating <span>4.0</span></div>
                        </div>
                    </div>

                    <p class="subtitle" style="font-size: 20px;">Sajaath Mohamed</p>
                    <h1 style="font-size: 18px;">Shopify Developer for Custom Themes & High Converting Stores</h1>

                    <p class="description">Experienced Shopify Liquid Theme Developer specializing in building fast, conversion-driven stores. Helping brands scale with custom architectures and performance-oriented development.</p>



                    <div class="hero-btns">
                        <a onclick="Calendly.initPopupWidget({url: 'https://calendly.com/mohamedsajaath0409/30min'});return false;" class="btn-main">
                            Book a call
                        </a>
                        <a href="https://wa.me/sajaathmohamed" target="_blank" class="btn-sub btn-whatsapp" style="color: #25d366; border-color: #25d366;">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="margin-right: 8px;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            Message on WhatsApp
                        </a>
                    </div>

                </div>
            </div>
        `,
        'tech-stack': `
            <div id="section-tech-stack" class="p-section-wrapper" style="padding: 40px 0; background: var(--bg-surface); overflow: hidden; border-bottom: 1px solid var(--border-color-subdued);">
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
                <h2 style="font-size: 28px; margin-bottom: 32px; border-bottom: 2px solid var(--border-color-subdued); padding-bottom: 12px; margin-top: 90px; text-align: center;">Shopify Stores I've Worked</h2>
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
                    <a href="pages/all-stores.html" class="btn-sub" style="display: inline-block;">View All Stores</a>
                </div>
            </div>
        `,


        'projects': `
            <div id="section-projects" class="p-section-wrapper">
                <h2 style="font-size: 28px; margin-bottom: 32px; border-bottom: 2px solid var(--border-color-subdued); padding-bottom: 12px; margin-top: 60px; text-align: center;">Other Projects</h2>
                
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
                <h2 style="font-size: 24px; margin-bottom: 24px; border-bottom: 2px solid var(--border-color-subdued); padding-bottom: 8px; margin-top: 40px; text-align: center;">Professional Experience</h2>
                <div class="timeline">
                    <div class="timeline-item left">
                        <div class="timeline-content">
                            <div class="time">Jan 2022 - Present</div>
                            <div class="role">Software Developer</div>
                            <div class="company">Solutionitcs • Sri Lanka</div>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-top: 8px;">Architected and launched WebScale, a productivity extension for web analysis and SEO optimization.</p>
                        </div>
                    </div>
                    <div class="timeline-item right">
                        <div class="timeline-content">
                            <div class="time">June 2025 - Present</div>
                            <div class="role">Shopify Developer</div>
                            <div class="company">Scale Solutions • Germany</div>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-top: 8px;">Liquid theme development and Shopify Plus store optimizations focused on international growth.</p>
                        </div>
                    </div>
                 
                    <!-- Hidden Items Container -->
                    <div id="more-experience" style="display: none; width: 100%;">
                         <div class="timeline-item left">
                            <div class="timeline-content">
                                <div class="time">October 2023 - May 2025</div>
                                <div class="role">Software Developer</div>
                                <div class="company">BayLanka Technologies • Sri Lanka</div>
                                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-top: 8px;">Driving full-stack development across client projects, specializing in performance and custom tools.</p>
                            </div>
                        </div>
                        <div class="timeline-item right">
                            <div class="timeline-content">
                                <div class="time">May 2024 - May 2025</div>
                                <div class="role">Shopify Storefront Dev</div>
                                <div class="company">Eshop Guide • Germany</div>
                                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-top: 8px;">Specialized in complex store migrations and custom Liquid architecture for high-revenue merchants.</p>
                            </div>
                        </div>
                        <div class="timeline-item left">
                            <div class="timeline-content">
                                <div class="time">Sep 2021 - Jan 2022</div>
                                <div class="role">Software Developer Trainee -> Software Developer</div>
                                <div class="company">Imara Software Solution • Sri Lanka</div>
                                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-top: 8px;">Gained foundational experience in web technologies and contributed to frontend development tasks.</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div style="text-align: center; margin-top: 20px;">
                    <button id="toggle-exp-btn" class="btn-sub" onclick="toggleExperience()">View All Experience</button>
                </div>
            </div>
        `,

        'articles': `
            <div id="section-articles" class="p-section-wrapper">
                <h2 class="section-header-centered">Articles & Technical Insights</h2>
                
                <div class="articles-grid">
                    <!-- Article 1 -->
                    <a href="https://www.linkedin.com/pulse/update-shopify-theme-without-breaking-sajaath-mohamed-7aolc/" target="_blank" class="article-card">
                        <div class="article-linkedin-icon">
                            <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </div>
                        <div class="article-image">
                            <img src="https://media.licdn.com/dms/image/v2/D5612AQEtSYlpnpEdkg/article-cover_image-shrink_720_1280/B56Zyq4BPlK4AI-/0/1772393342566?e=2147483647&v=beta&t=nb1Qr5TMVZaVmOYWH8o7XHn1iuMTJJGldz3SMIY4ZiE" alt="Shopify Theme Updates">
                        </div>
                        <div class="article-content">
                            <div class="article-meta">
                                <span class="article-date">Mar 1, 2026</span>
                            </div>
                            <h3 class="article-title">Update Shopify Theme Without Breaking Customizations</h3>
                            <p class="article-excerpt">A practical guide for developers to handle complex theme updates while preserving custom business logic and UI changes.</p>
                            <div class="article-tags">
                                <span class="article-tag">Shopify</span>
                                <span class="article-tag">Theme Dev</span>
                            </div>
                        </div>
                    </a>

                    <!-- Article 2 -->
                    <a href="https://www.linkedin.com/pulse/section-rendering-api-my-sdk-sajaath-mohamed-qtcsc/" target="_blank" class="article-card">
                        <div class="article-linkedin-icon">
                            <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </div>
                        <div class="article-image">
                            <img src="https://media.licdn.com/dms/image/v2/D5612AQF3JLb8Xx9L4A/article-cover_image-shrink_720_1280/B56ZeOVLkQH8AI-/0/1750439609855?e=2147483647&v=beta&t=aEATleP1BeLwoYYcxRS3y5evPrIt-jjC5n1R4dqHfmw" alt="Section Rendering API SDK">
                        </div>
                        <div class="article-content">
                            <div class="article-meta">
                                <span class="article-date">Jun 20, 2025</span>
                            </div>
                            <h3 class="article-title">Section Rendering API + My Open-Source SDK</h3>
                            <p class="article-excerpt">Introducing a lightweight SDK designed to simplify dynamic UI updates in Shopify by wrapping the Section Rendering API.</p>
                            <div class="article-tags">
                                <span class="article-tag">API</span>
                                <span class="article-tag">Open Source</span>
                            </div>
                        </div>
                    </a>

                    <!-- Article 3 -->
                    <a href="https://www.linkedin.com/pulse/creating-shopify-sections-sidekick-ai-developers-guide-mohamed-3kohc/" target="_blank" class="article-card">
                        <div class="article-linkedin-icon">
                            <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </div>
                        <div class="article-image">
                            <img src="https://media.licdn.com/dms/image/v2/D5612AQHm90D7Hzsnhw/article-cover_image-shrink_720_1280/B56ZddNWqAGsAI-/0/1749615471743?e=2147483647&v=beta&t=kykDQr76EriNuNfSYgV87vIt-p7b-aHAos4dNPPg8MM" alt="Shopify Sidekick AI">
                        </div>
                        <div class="article-content">
                            <div class="article-meta">
                                <span class="article-date">Jun 21, 2025</span>
                            </div>
                            <h3 class="article-title">Creating Shopify Sections with Sidekick AI</h3>
                            <p class="article-excerpt">How to convert Shopify Sidekick-generated blocks into fully reusable, high-performance liquid sections.</p>
                            <div class="article-tags">
                                <span class="article-tag">Shopify AI</span>
                                <span class="article-tag">Liquid</span>
                            </div>
                        </div>
                    </a>
                </div>

                <div style="text-align: center; margin-top: 40px;">
                    <a href="https://www.linkedin.com/in/sajaathmohamed/recent-activity/articles/" target="_blank" class="btn-sub" style="display: inline-block;">View All Articles on LinkedIn</a>
                </div>
            </div>
        `,

        'virtual-office': `
            <div id="section-virtual-office" class="p-section-wrapper">
                <div class="office-hero">
                    <div class="office-main-card">
                        <div class="office-visuals">
                            <div class="office-image-stack">
                                <img src="images/virtual office 1.png" alt="My Virtual Office View 1" class="office-img-primary">
                                <img src="images/virtual office 2.png" alt="My Virtual Office View 2" class="office-img-secondary">
                            </div>
                            <div class="office-status-badge">
                                <span class="live-indicator"></span>
                                <span class="status-mode">Live Hub</span>
                            </div>
                        </div>

                        <div class="office-details">
                            <div class="office-header-group">
                                <span class="office-pretitle">Workspace • Interact • Connect</span>
                                <h1 class="office-big-title">Visit my office virtually</h1>
                            </div>
                            
                            <p class="office-description">
                                Step into my digitized workspace on Work Adventure it's an interactive campus designed for real-time collaboration and spontaneous meetings. <strong>Just pick a name and walk in!</strong>
                            </p>
                            
                            <div class="schedule-card-compact">
                                <div class="schedule-top">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>Office Hours (GMT+5:30)</span>
                                </div>
                                <div class="schedule-body">
                                    <div class="schedule-item-live">
                                        <div class="day-dot"></div>
                                        <span class="day-label">Mon — Thu</span>
                                        <span class="hour-label">9:00 AM — 4:00 PM</span>
                                    </div>
                                    <div class="schedule-item-off">
                                        <div class="day-dot"></div>
                                        <span class="day-label">Fri — Sun</span>
                                        <span class="hour-label">Offline</span>
                                    </div>
                                </div>
                            </div>

                            <a href="https://play.workadventu.re/@/solutionitics/solutionitics/solutionitics-campus" target="_blank" class="teleport-action-btn">
                                <span>Teleport to My Office</span>
                                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                            <p class="office-small-hint">Optimal performance on Chrome/Desktop.</p>
                        </div>
                    </div>
                </div>
            </div>
        `,

        'skills': `
            <div id="section-skills" class="p-section-wrapper">
                <div class="skills-container">
                    <h2 style="font-size: 24px; margin-bottom: 24px; border-bottom: 2px solid var(--border-color-subdued); padding-bottom: 8px; margin-top: 60px; text-align: center;">Expertise & Credentials</h2>
                    
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
                <h2 style="font-size: 28px; margin-bottom: 32px; border-bottom: 2px solid var(--border-color-subdued); padding-bottom: 12px; margin-top: 90px; text-align: center;">Partner Agencies</h2>
                
                <div class="agencies-list">
                    <!-- Scale Solutions -->
                    <div class="agency-feature-card">
                        <div class="agency-badge">Marketing Partner</div>
                        <div class="agency-logo-wrapper">
                            <img src="images/scalesolutions.svg" alt="Scale Solutions Logo">
                        </div>
                        <h3 style="font-size: 24px; color: var(--text-strong); margin-bottom: 16px;">Scale Solutions</h3>
                        <p style="color: var(--text-muted); font-size: 13px; line-height: 1.6; max-width: 600px; margin-bottom: 32px;">
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

                    <!-- UI Master -->
                    <div class="agency-feature-card">
                        <div class="agency-badge">Design Partner</div>
                        <div class="agency-logo-wrapper" style="max-width: 140px;">
                            <div class="uimaster-logo-box">
                                <img src="https://static.wixstatic.com/media/629672_ceef1a9c4e024ae5bc1c53f89f6159f7~mv2.png" alt="UI Master Logo">
                            </div>
                        </div>
                        <h3 style="font-size: 24px; color: var(--text-strong); margin-bottom: 16px;">UI Master</h3>
                        <p style="color: var(--text-muted); font-size: 13px; line-height: 1.6; max-width: 600px; margin-bottom: 32px;">
                            Professional design agency specializing in creating user-friendly, visually stunning e-commerce store designs. A dedicated Shopify Agency delivering high-quality, performance-driven solutions globally.
                        </p>

                        <div class="agency-services-grid">
                            <div class="agency-service-item">
                                <div class="agency-service-title">E-commerce Design</div>
                                <div class="agency-service-desc">Clean, conversion-oriented store layouts and interactive prototypes.</div>
                            </div>
                            <div class="agency-service-item">
                                <div class="agency-service-title">Shopify App Design</div>
                                <div class="agency-service-desc">Specialized UI/UX for Shopify extensions and custom merchant tools.</div>
                            </div>
                            <div class="agency-service-item">
                                <div class="agency-service-title">Website Redesign</div>
                                <div class="agency-service-desc">Modernizing legacy stores with performance-first design and modern branding.</div>
                            </div>
                        </div>

                        <div class="hero-btns">
                            <a href="https://www.uimaster.net/" target="_blank" class="btn-main">
                                Visit Agency Website →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `,


        'reviews': `
            <div id="section-reviews" class="p-section-wrapper">
                <h2 style="font-size: 28px; margin-bottom: 32px; border-bottom: 2px solid var(--border-color-subdued); padding-bottom: 12px; margin-top: 90px; text-align: center;">Reviews & Recommendations</h2>
                
                <div class="reviews-container">
                    <div class="reviews-filter-tabs" role="tablist" aria-label="Review type filters">
                        <button class="review-tab active" role="tab" aria-selected="true" onclick="switchReviewTab('reviews')">Reviews</button>
                        <button class="review-tab" role="tab" aria-selected="false" onclick="switchReviewTab('recommendations')">Recommendations</button>
                    </div>

                    <div id="reviews-content" class="reviews-grid">
                        <!-- Julian Fritsch -->
                        <div class="review-card" style="cursor: pointer;" onclick="window.open('https://www.trustpilot.com/review/sajaath-mohamed.online', '_blank')">
                            <div class="review-header">
                                <div class="review-user-box">
                                    <div class="review-initials">JF</div>
                                    <div>
                                        <div class="review-user-name">Julian Fritsch</div>
                                        <div class="review-user-meta">DE • 4 reviews</div>
                                    </div>
                                </div>
                                <div class="review-date">Feb 20, 2026</div>
                            </div>
                            <div class="review-rating-row">
                                <div class="review-stars">
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                </div>
                            </div>
                            <div class="review-body">
                                <div class="review-title">Always a pleasure working with Sajaath</div>
                                <div class="review-text">Always a pleasure working with Sajaath. His deliveries are right on time and also very high quality. He has a deep knowledge in Front-End Development, especially when it comes to Shopify. We did a lot of Shopify projects and custom features with him and it always worked out great. If you need an experienced, fast and very good to work with Front-End Developer, Sajaath is your guy!</div>
                            </div>
                            <div class="review-reply">
                                <div class="reply-header">
                                    <div class="reply-avatar">
                                        <img src="sajaath_mohamed.jpg" alt="Sajaath Mohamed">
                                    </div>
                                    <div class="reply-info">
                                        <div class="reply-name">Reply from Sajaath Mohamed</div>
                                        <div class="reply-date">Feb 20, 2026</div>
                                    </div>
                                </div>
                                <div class="reply-text">Thank you so much for the kind words and continued trust. It’s always a pleasure collaborating with you on Shopify projects and building custom features together. I truly appreciate the smooth communication and clear direction, which makes delivering high-quality work on time much easier. Looking forward to many more successful projects ahead.</div>
                            </div>
                        </div>

                        <!-- Daniel Geiger -->
                        <div class="review-card" style="cursor: pointer;" onclick="window.open('https://www.trustpilot.com/review/sajaath-mohamed.online', '_blank')">
                            <div class="review-header">
                                <div class="review-user-box">
                                    <div class="review-initials">DG</div>
                                    <div>
                                        <div class="review-user-name">Daniel Geiger</div>
                                        <div class="review-user-meta">DE • 3 reviews</div>
                                    </div>
                                </div>
                                <div class="review-date">Feb 20, 2026</div>
                            </div>
                            <div class="review-rating-row">
                                <div class="review-stars">
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                </div>
                            </div>
                            <div class="review-body">
                                <div class="review-title">Sajaath is a standout developer who amazing job supporting our e-commerce agency</div>
                                <div class="review-text">Sajaath is a standout developer who does an amazing job supporting our e-commerce agency on various client projects. He was instrumental in our Shopify theme development, consistently delivering clean, high-performance code under tight agency deadlines. He is highly skilled in technical troubleshooting, app integrations, and site speed optimization. Sajaath is a reliable professional who handles complex client requirements with ease and always ensures a flawless end product. I highly recommend him to any agency looking for a dependable, top-tier developer.</div>
                            </div>
                            <div class="review-reply">
                                <div class="reply-header">
                                    <div class="reply-avatar">
                                        <img src="sajaath_mohamed.jpg" alt="Sajaath Mohamed">
                                    </div>
                                    <div class="reply-info">
                                        <div class="reply-name">Reply from Sajaath Mohamed</div>
                                        <div class="reply-date">Feb 20, 2026</div>
                                    </div>
                                </div>
                                <div class="reply-text">Thank you so much for the kind words and trust. It’s always a pleasure working with your team and contributing to such impactful projects. I truly appreciate the collaboration and look forward to supporting many more successful launches together.</div>
                            </div>
                        </div>

                        <!-- Jan Moritz Wrzesniewski -->
                        <div class="review-card" style="cursor: pointer;" onclick="window.open('https://www.trustpilot.com/review/sajaath-mohamed.online', '_blank')">
                            <div class="review-header">
                                <div class="review-user-box">
                                    <div class="review-initials">JW</div>
                                    <div>
                                        <div class="review-user-name">Jan Moritz Wrzesniewski</div>
                                        <div class="review-user-meta">DE • 1 review</div>
                                    </div>
                                </div>
                                <div class="review-date">Feb 20, 2026</div>
                            </div>
                            <div class="review-rating-row">
                                <div class="review-stars">
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                    <div class="review-star-box"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></div>
                                </div>
                            </div>
                            <div class="review-body">
                                <div class="review-title">Very happy with the work of Mohamed</div>
                                <div class="review-text">Very happy with the work of Mohamed. We were working toghether on a CRO project for a D2C Brand. He is a great developer and made every request possible. The Communication was seamles and most importantly he is honest about the time it took him to get the work done. We from OOAKLINE really recommend him!</div>
                            </div>
                            <div class="review-reply">
                                <div class="reply-header">
                                    <div class="reply-avatar">
                                        <img src="sajaath_mohamed.jpg" alt="Sajaath Mohamed">
                                    </div>
                                    <div class="reply-info">
                                        <div class="reply-name">Reply from Sajaath Mohamed</div>
                                        <div class="reply-date">Feb 20, 2026</div>
                                    </div>
                                </div>
                                <div class="reply-text">Thank you for the kind words and for the opportunity to work on the CRO project. It was great collaborating with the OOAKLINE. I really appreciate the trust and smooth communication throughout the process.</div>
                            </div>
                        </div>
                    </div>

                    <div id="recommendations-content" class="recommendations-grid" style="display: none;">
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

                        <!-- Francis Silva -->
                        <div class="recommendation-card">
                            <div class="recommender-header">
                                <div class="recommender-avatar">
                                    <img src="images/Francis.jpeg" alt="Francis Silva">
                                </div>
                                <div class="recommender-info">
                                    <div class="recommender-name">Francis Silva</div>
                                    <div class="recommender-title">Shopify Plus Developer • Germany 🇩🇪</div>
                                </div>
                            </div>
                            <div class="recommendation-text">
                                "I had the pleasure of working closely with Sajaath Mohamed at Eshop Guide. He is an exceptionally talented Shopify developer, always delivering clean, efficient, and creative solutions. Working with him taught me a lot about development best practices and problem-solving. His professionalism, knowledge, and collaborative spirit make him someone I highly recommend to any team."
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
                    <!-- TrustBox widget - Review Collector -->
                    <div style="margin-top: 40px; border-top: 1px solid var(--border-color-subdued); padding-top: 32px;">
                        <div class="trustpilot-widget" data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="6996d84f186850d3ad797804" data-style-height="52px" data-style-width="100%" data-token="0ff42ff3-ee14-40c5-b3c0-bc2213b01fa1">
                            <a href="https://www.trustpilot.com/review/sajaath-mohamed.online" target="_blank" rel="noopener">Trustpilot</a>
                        </div>
                    </div>
                    <!-- End TrustBox widget -->
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
                            <a href="https://calendly.com/mohamedsajaath0409/30min" target="_blank" class="btn-main">Work with me</a>
                        </div>

                    </div>

                    <div class="footer-bottom">
                        <div>© 2026 Sajaath Mohamed — Built with Passion</div>
                        <div class="footer-info">
                            <span class="footer-link">Puttalam District, LK</span>
                            <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-end;">
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

            // Handle live updates for Hero Rating
            if (id === 'hero') {
                const ratingInput = settingsContent.querySelector('#hero-rating');
                if (ratingInput) {
                    ratingInput.addEventListener('input', (e) => {
                        const val = parseFloat(e.target.value) || 0;
                        const starsContainer = document.querySelector('.hero-score-badge .score-stars');
                        const labelValue = document.querySelector('.hero-score-badge .score-label span');

                        if (starsContainer && labelValue) {
                            labelValue.textContent = val.toFixed(1);
                            const boxes = starsContainer.querySelectorAll('.star-unit');
                            boxes.forEach((box, index) => {
                                if (index < Math.floor(val)) {
                                    box.classList.remove('empty');
                                } else {
                                    box.classList.add('empty');
                                }
                            });
                        }
                    });
                }
            }
        }

        const targetSection = document.querySelector(`.canvas-section[data-section-id="${id}"]`);
        if (targetSection) {
            document.querySelectorAll('.canvas-section').forEach(s => s.classList.remove('canvas-active'));
            targetSection.classList.add('canvas-active');
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Trigger typing effect for hero
            if (id === 'hero') {
                const desc = targetSection.querySelector('.description');
                const fullText = "Experienced Shopify Liquid Theme Developer specializing in building fast, conversion-driven stores. Helping brands scale with custom architectures and performance-oriented development.";
                if (desc) {
                    // Only start if not already typing to avoid flickering
                    if (!desc.classList.contains('typing')) {
                        setTimeout(() => {
                            typeWriter(desc, fullText);
                        }, 800);
                    }
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
            tabs.forEach(t => {
                if (t.textContent.includes('Recommendations')) {
                    t.classList.add('active');
                    t.setAttribute('aria-selected', 'true');
                } else {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                }
            });
        } else {
            if (recContent) recContent.style.display = 'none';
            if (revContent) revContent.style.display = 'grid';
            tabs.forEach(t => {
                if (t.textContent.includes('Reviews')) {
                    t.classList.add('active');
                    t.setAttribute('aria-selected', 'true');
                } else {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                }
            });
        }
    };

    window.addStarToProfile = function (event) {
        event.stopPropagation(); // BUG FIX: Prevent switching section and restarting typing

        const startX = event.clientX;
        const startY = event.clientY;

        const profileImg = document.querySelector('.hero-image');
        const profileStar = document.getElementById('profile-star');

        if (!profileImg || !profileStar) return;

        const targetRect = profileImg.getBoundingClientRect();
        const targetX = targetRect.left + targetRect.width / 2 - startX;
        const targetY = targetRect.top + targetRect.height / 2 - startY;

        // Create flying star
        const star = document.createElement('div');
        star.className = 'floating-star';
        star.innerHTML = `
            <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
        `;
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        star.style.setProperty('--target-x', `${targetX}px`);
        star.style.setProperty('--target-y', `${targetY}px`);

        document.body.appendChild(star);

        setTimeout(() => {
            star.remove();
            profileStar.classList.add('active');

            // Add a little pulse to the image
            profileImg.style.transform = 'scale(1.1)';
            setTimeout(() => {
                profileImg.style.transform = '';
            }, 300);
        }, 1000);

        // Redirect after animation (3 seconds as requested)
        setTimeout(() => {
            window.open('https://www.trustpilot.com/review/sajaath-mohamed.online', '_blank');
        }, 3000);
    };

    window.scrollToSection = function (id) {
        switchSection(id);
    };

    function updateOfficeStatus() {
        const now = new Date();
        // Sri Lanka is GMT+5:30. Calculate UTC offset.
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const slDate = new Date(utc + (3600000 * 5.5));

        const day = slDate.getDay(); // 0: Sun, 1: Mon... 4: Thu
        const hours = slDate.getHours();
        const minutes = slDate.getMinutes();
        const timeValue = hours + minutes / 60;

        const isWorkingDay = day >= 1 && day <= 4;
        const isWorkingHour = timeValue >= 9 && timeValue < 16;
        const online = isWorkingDay && isWorkingHour;

        const indicators = document.querySelectorAll('.live-indicator');
        const labels = document.querySelectorAll('.status-mode');

        indicators.forEach(ind => {
            if (online) {
                ind.classList.remove('offline');
            } else {
                ind.classList.add('offline');
            }
        });

        labels.forEach(label => {
            label.textContent = online ? 'Online Now' : 'Offline';
            label.style.color = online ? 'var(--text-strong)' : 'var(--text-muted)';
        });
    }

    // Update status every minute
    updateOfficeStatus();
    setInterval(updateOfficeStatus, 60000);
});


