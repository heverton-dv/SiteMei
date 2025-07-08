 // Rolagem suave para links de navegação
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animação de fade-in ao rolar a página
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

            
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(124,58,237,0.95), rgba(91,33,182,0.95))';
            } else {
                header.style.background = 'linear-gradient(135deg, #7C3AED, #5B21B6)';
            }
        });

        // Efeito de hover nos itens do menu
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Efeito de clique nos itens de contato
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });

        //Efeito de pulso
        const ctaButton = document.querySelector('.cta-button');
        setInterval(() => {
            ctaButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
            ctaButton.style.transform = 'scale(1)';
            }, 200);
        }, 3000);

        // Animação de entrada
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });

        // Alternar menu mobile
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        `;
        
        document.querySelector('nav').appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Menu Responsivo 
        function checkScreenSize() {
            const navLinks = document.querySelector('.nav-links');
            const mobileBtn = mobileMenuBtn;
            
            if (window.innerWidth <= 768) {
                mobileBtn.style.display = 'block';
                navLinks.style.cssText = `
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: linear-gradient(135deg, #7C3AED, #5B21B6);
                    flex-direction: column;
                    padding: 1rem;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                `;
            } else {
                mobileBtn.style.display = 'none';
                navLinks.style.cssText = `
                    display: flex;
                    list-style: none;
                    gap: 2rem;
                    position: static;
                    width: auto;
                    background: none;
                    flex-direction: row;
                    padding: 0;
                    box-shadow: none;
                `;
            }
        }

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();

        // Efeito parallax para a seção hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Menu interativo com carrinho de compras
        let cart = [];
        let cartTotal = 0;

        function createCartSystem() {
            // Botão do carrinho de compras
            const cartBtn = document.createElement('button');
            cartBtn.innerHTML = '🛒 Carrinho (0)';
            cartBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(45deg, #7C3AED, #5B21B6);
                color: white;
                border: none;
                padding: 15px 20px;
                border-radius: 50px;
                font-weight: bold;
                cursor: pointer;
                z-index: 1000;
                box-shadow: 0 4px 15px rgba(124,58,237,0.3);
                transition: all 0.3s ease;
            `;
            
            cartBtn.addEventListener('mouseover', () => {
                cartBtn.style.transform = 'scale(1.05)';
            });
            
            cartBtn.addEventListener('mouseout', () => {
                cartBtn.style.transform = 'scale(1)';
            });
            
            document.body.appendChild(cartBtn);

            // Add "Adicionar ao Carrinho" 
            document.querySelectorAll('.menu-item').forEach((item, index) => {
                const addBtn = document.createElement('button');
                addBtn.innerHTML = 'Adicionar ao Carrinho';
                addBtn.style.cssText = `
                    background: linear-gradient(45deg, #7C3AED, #5B21B6);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 25px;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 10px;
                    transition: all 0.3s ease;
                    width: 100%;
                `;
                
                addBtn.addEventListener('click', () => {
                    const itemName = item.querySelector('h3').textContent;
                    const itemPrice = parseFloat(item.querySelector('.price').textContent.replace('R$ ', '').replace(',', '.'));
                    
                    cart.push({name: itemName, price: itemPrice});
                    cartTotal += itemPrice;
                    
                    cartBtn.innerHTML = `🛒 Carrinho (${cart.length})`;
                    
                    // Feedback Visual
                    addBtn.innerHTML = 'Adicionado!';
                    addBtn.style.background = '#10B981';
                    setTimeout(() => {
                        addBtn.innerHTML = 'Adicionar ao Carrinho';
                        addBtn.style.background = 'linear-gradient(45deg, #7C3AED, #5B21B6)';
                    }, 1000);
                });
                
                item.appendChild(addBtn);
            });

            // Funcionalidade do botão do carrinho
            cartBtn.addEventListener('click', () => {
                showCartModal();
            });
        }

        function showCartModal() {
            //Criar novo carrinho caso ja exista um
            const existingModal = document.querySelector('.cart-modal');
            if (existingModal) {
                existingModal.remove();
            }

            const modal = document.createElement('div');
            modal.className = 'cart-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            `;
            
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background: white;
                padding: 2rem;
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                animation: slideIn 0.3s ease;
            `;
            
            let cartHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h2 style="color: #7C3AED; margin: 0;">🛒 Seu Carrinho</h2>
                    <button onclick="closeCartModal()" style="
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                        color: #999;
                        padding: 5px;
                        border-radius: 50%;
                        width: 30px;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">×</button>
                </div>
            `;
            
            if (cart.length === 0) {
                cartHTML += `
                    <div style="text-align: center; padding: 2rem;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
                        <p style="color: #666; font-size: 1.2rem;">Seu carrinho está vazio</p>
                        <p style="color: #999;">Adicione alguns itens deliciosos do nosso menu!</p>
                    </div>
                `;
            } else {
                cartHTML += '<div style="max-height: 300px; overflow-y: auto;">';
                cart.forEach((item, index) => {
                    cartHTML += `
                        <div style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 15px 0;
                            border-bottom: 1px solid #eee;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='transparent'">
                            <div>
                                <strong style="color: #333; display: block;">${item.name}</strong>
                                <small style="color: #666;">Quantidade: 1</small>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="color: #7C3AED; font-weight: bold;">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                                <button onclick="removeFromCart(${index})" style="
                                    background: #EF4444;
                                    color: white;
                                    border: none;
                                    padding: 5px 8px;
                                    border-radius: 50%;
                                    cursor: pointer;
                                    font-size: 0.8rem;
                                    transition: all 0.3s ease;
                                " onmouseover="this.style.backgroundColor='#DC2626'" onmouseout="this.style.backgroundColor='#EF4444'">🗑️</button>
                            </div>
                        </div>
                    `;
                });
                cartHTML += '</div>';
                
                cartHTML += `
                    <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 2px solid #7C3AED;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <span style="font-size: 1.2rem; color: #333;">Total:</span>
                            <strong style="font-size: 1.5rem; color: #7C3AED;">R$ ${cartTotal.toFixed(2).replace('.', ',')}</strong>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <button onclick="clearCart()" style="
                                background: #EF4444;
                                color: white;
                                border: none;
                                padding: 12px 20px;
                                border-radius: 25px;
                                font-weight: bold;
                                cursor: pointer;
                                flex: 1;
                                transition: all 0.3s ease;
                            " onmouseover="this.style.backgroundColor='#DC2626'" onmouseout="this.style.backgroundColor='#EF4444'">Limpar Carrinho</button>
                            <button onclick="finalizeOrder()" style="
                                background: linear-gradient(45deg, #7C3AED, #5B21B6);
                                color: white;
                                border: none;
                                padding: 12px 20px;
                                border-radius: 25px;
                                font-weight: bold;
                                cursor: pointer;
                                flex: 2;
                                transition: all 0.3s ease;
                            " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">📱 Finalizar no WhatsApp</button>
                        </div>
                    </div>
                `;
            }
            
            cartHTML += `
                <style>
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideIn {
                        from { transform: translateY(-20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                </style>
            `;
            
            modalContent.innerHTML = cartHTML;
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Fechar modal clicando fora
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeCartModal();
                }
            });
        }

        // Função para fechar o modal
        window.closeCartModal = function() {
            const modal = document.querySelector('.cart-modal');
            if (modal) {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        };

        // Função para remover item do carrinho
        window.removeFromCart = function(index) {
            if (index >= 0 && index < cart.length) {
                cartTotal -= cart[index].price;
                cart.splice(index, 1);
                
                // Atualizar contador do carrinho
                const cartBtn = document.querySelector('button[onclick*="Carrinho"]') || 
                              document.querySelector('button').innerHTML.includes('🛒') ? 
                              document.querySelector('button') : null;
                if (cartBtn) {
                    cartBtn.innerHTML = `🛒 Carrinho (${cart.length})`;
                }
                
                // Reabrir modal com dados atualizados
                showCartModal();
                
                // Feedback visual
                if (cart.length === 0) {
                    setTimeout(() => {
                        const emptyMessage = document.querySelector('.cart-modal p');
                        if (emptyMessage) {
                            emptyMessage.style.animation = 'pulse 1s ease';
                        }
                    }, 100);
                }
            }
        };

        // Função para limpar carrinho
        window.clearCart = function() {
            if (confirm('Tem certeza que deseja limpar todo o carrinho?')) {
                cart = [];
                cartTotal = 0;
                
                // Atualizar contador do carrinho
                const cartBtn = document.querySelector('button[onclick*="Carrinho"]') || 
                              document.querySelector('button').innerHTML.includes('🛒') ? 
                              document.querySelector('button') : null;
                if (cartBtn) {
                    cartBtn.innerHTML = `🛒 Carrinho (0)`;
                }
                
                // Reabrir modal
                showCartModal();
            }
        };

        window.finalizeOrder = function() {
            if (cart.length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }
            
            const message = `🍇 *Pedido Açaí LHM* 🍇\n\nOlá! Gostaria de fazer o seguinte pedido:\n\n${cart.map((item, index) => `${index + 1}. ${item.name} - R$ ${item.price.toFixed(2).replace('.', ',')}`).join('\n')}\n\n💰 *Total: R$ ${cartTotal.toFixed(2).replace('.', ',')}*\n\n📍 *Endereço para entrega:*\n(Por favor, informe seu endereço)\n\n🕒 *Forma de pagamento:*\n(Dinheiro, PIX, Cartão)\n\nObrigado pela preferência! 😊`;
            
            const whatsappURL = `https://wa.me/5571993627318?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
            
            // Feedback visual
            const finalizeBtn = document.querySelector('button[onclick="finalizeOrder()"]');
            if (finalizeBtn) {
                finalizeBtn.innerHTML = '✅ Pedido Enviado!';
                finalizeBtn.style.background = '#10B981';
                setTimeout(() => {
                    finalizeBtn.innerHTML = '📱 Finalizar no WhatsApp';
                    finalizeBtn.style.background = 'linear-gradient(45deg, #7C3AED, #5B21B6)';
                }, 2000);
            }
            
            // Perguntar se deseja limpar o carrinho
            setTimeout(() => {
                if (confirm('Pedido enviado! Deseja limpar o carrinho?')) {
                    cart = [];
                    cartTotal = 0;
                    const cartBtn = document.querySelector('button[onclick*="Carrinho"]') || 
                                  Array.from(document.querySelectorAll('button')).find(btn => btn.innerHTML.includes('🛒'));
                    if (cartBtn) {
                        cartBtn.innerHTML = '🛒 Carrinho (0)';
                    }
                    closeCartModal();
                }
            }, 1000);
        };

        // Newsletter login
        function createNewsletterSection() {
            const newsletterSection = document.createElement('section');
            newsletterSection.style.cssText = `
                background: linear-gradient(135deg, #7C3AED, #5B21B6);
                color: white;
                padding: 60px 0;
                text-align: center;
            `;
            
            newsletterSection.innerHTML = `
                <div class="container">
                    <h2 style="font-size: 2rem; margin-bottom: 1rem;">Receba nossas promoções!</h2>
                    <p style="margin-bottom: 2rem;">Cadastre-se e seja o primeiro a saber sobre nossos descontos especiais</p>
                    <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        <input type="email" placeholder="Seu melhor email" style="
                            padding: 12px 20px;
                            border: none;
                            border-radius: 25px;
                            font-size: 1rem;
                            min-width: 250px;
                            outline: none;
                        ">
                        <button onclick="subscribeNewsletter()" style="
                            background: white;
                            color: #7C3AED;
                            border: none;
                            padding: 12px 30px;
                            border-radius: 25px;
                            font-weight: bold;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        ">Cadastrar</button>
                    </div>
                </div>
            `;
            
            document.querySelector('#contact').parentNode.insertBefore(newsletterSection, document.querySelector('#contact'));
        }

        window.subscribeNewsletter = function() {
            const email = document.querySelector('input[type="email"]').value;
            if (email) {
                alert('Obrigado! Você receberá nossas promoções em breve!');
                document.querySelector('input[type="email"]').value = '';
            } else {
                alert('Por favor, digite um email válido!');
            }
        };

        // Carrosel de Depoimentos
        function createTestimonials() {
            const testimonials = [
                {name: "Maria Silva", text: "Melhor açaí da cidade! Sempre fresco e delicioso!"},
                {name: "João Santos", text: "Atendimento excelente e produtos de qualidade!"},
                {name: "Ana Costa", text: "Meu lugar favorito para tomar açaí com a família!"}
            ];
            
            const testimonialsSection = document.createElement('section');
            testimonialsSection.style.cssText = `
                background: white;
                padding: 60px 0;
                text-align: center;
            `;
            
            let currentTestimonial = 0;
            
            testimonialsSection.innerHTML = `
                <div class="container">
                    <h2 style="color: #7C3AED; font-size: 2rem; margin-bottom: 2rem;">O que nossos clientes dizem</h2>
                    <div id="testimonial-container" style="
                        background: #F8FAFC;
                        padding: 2rem;
                        border-radius: 20px;
                        max-width: 600px;
                        margin: 0 auto;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    ">
                        <p style="font-size: 1.2rem; font-style: italic; margin-bottom: 1rem;">"${testimonials[0].text}"</p>
                        <strong style="color: #7C3AED;">${testimonials[0].name}</strong>
                    </div>
                    <div style="margin-top: 1rem;">
                        <button onclick="prevTestimonial()" style="
                            background: #7C3AED;
                            color: white;
                            border: none;
                            padding: 10px 15px;
                            border-radius: 50%;
                            cursor: pointer;
                            margin: 0 10px;
                        ">‹</button>
                        <button onclick="nextTestimonial()" style="
                            background: #7C3AED;
                            color: white;
                            border: none;
                            padding: 10px 15px;
                            border-radius: 50%;
                            cursor: pointer;
                            margin: 0 10px;
                        ">›</button>
                    </div>
                </div>
            `;
            
            document.querySelector('#about').parentNode.insertBefore(testimonialsSection, document.querySelector('#contact'));
            
            window.nextTestimonial = function() {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                updateTestimonial();
            };
            
            window.prevTestimonial = function() {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                updateTestimonial();
            };
            
            function updateTestimonial() {
                const container = document.getElementById('testimonial-container');
                container.innerHTML = `
                    <p style="font-size: 1.2rem; font-style: italic; margin-bottom: 1rem;">"${testimonials[currentTestimonial].text}"</p>
                    <strong style="color: #7C3AED;">${testimonials[currentTestimonial].name}</strong>
                `;
            }
            
            // Rotação automatica do carrosel 
            setInterval(() => {
                nextTestimonial();
            }, 5000);
        }

        // Efeito de digitação no titulo
        function typeWriter() {
            const text = "Açaí LHM";
            const heroTitle = document.querySelector('.hero h1');
            heroTitle.innerHTML = "";
            
            let i = 0;
            function type() {
                if (i < text.length) {
                    heroTitle.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, 200);
                }
            }
            
            setTimeout(type, 1000);
        }

        // Initialize all features
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                createCartSystem();
                createNewsletterSection();
                createTestimonials();
                typeWriter();
            }, 500);
        });

        // preço dinamico baseado das horas do dia
        function updatePricing() {
            const hour = new Date().getHours();
            const isHappyHour = hour >= 14 && hour <= 17; // 2PM - 5PM
            
            if (isHappyHour) {
                document.querySelectorAll('.price').forEach(priceEl => {
                    const originalPrice = parseFloat(priceEl.textContent.replace('R$ ', '').replace(',', '.'));
                    const discountPrice = originalPrice * 0.9; // 10% discount
                    priceEl.innerHTML = `<span style="text-decoration: line-through; color: #999;">R$ ${originalPrice.toFixed(2).replace('.', ',')}</span><br>R$ ${discountPrice.toFixed(2).replace('.', ',')} <span style="color: #10B981; font-size: 0.8rem;">(Happy Hour!)</span>`;
                });
            }
        }

        // Checagem de HappyHour
        updatePricing();
        setInterval(updatePricing, 60000); // checar todo minuto