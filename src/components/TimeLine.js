import "./TimeLine.css";
import { useNavigate } from "react-router-dom";
const TimeLine = () => {
    const navigate = useNavigate()
    function navigateTo() {
        navigate("/organization");
    }

    return (<div className="timeline-component component">
        <h1 className="component-heading">Getting the best out of the GSoC Hub: A Quick Guide</h1>
        <div className="wesbite-guide-timeline component-background">
            <section id="status-timeline" className="status-container">
                <div className="status-timeline-block">
                    <div className="status-timeline-img status-picture">
                        <span className="image-inside-text">1</span>
                    </div>

                    <div className="status-timeline-content">
                        <h2>Navigate the GSoC Universe</h2>
                        <p> Find the perfect organization that aligns with your tech stack, goals, and ideas.
                            With GSoC HUB, discovering your ideal organization is easier than ever. Use smart filters to explore organizations based on your interests and technology preferences.
                        </p>
                        <p>You can also get insights into which organizations are more likely to participate in future Google summer of code — helping you plan ahead and shortlist the most promising ones effortlessly.</p>
                        <div href="#0" className="status-read-more" onClick={() => { navigateTo() }}>Tap to Launch Tool</div>
                    </div>
                </div>

                <div className="status-timeline-block">
                    <div className="status-timeline-img status-movie">
                        <span className="image-inside-text">2</span>
                    </div>

                    <div className="status-timeline-content">
                        <h2>Pick Your Perfect Fit</h2>
                        <p>There are many smart filters to help you find the right organization based on your needs. You can filter by topics, tech stack, categories like robotics or finance, and even by the years they've participated in GSoC.</p>
                        <p>One of my personal favorites is the “year” filter — it helps you spot organizations that show up regularly, giving you a better chance to plan ahead.</p>
                    </div>
                </div>

                <div className="status-timeline-block">
                    <div className="status-timeline-img status-location">
                        <span className="image-inside-text">3</span>
                    </div>

                    <div className="status-timeline-content">
                        <h2>Ping the Contributors</h2>
                        <p>Stuck choosing a repository after selecting an organization? No worries — GSoC Hub has your back!</p>
                        <p>In the organization's details, you'll find a list of contributors. Just click on a name to visit their GitHub profile — from there, you can often find their social media links and reach out for guidance or a quick push in the right direction.</p>
                        <p>We get it — getting into Opensource can feel overwhelming. But many contributors are friendly and happy to guide you. You’ll also find the org’s social media handles on GSoC Hub. Reach out and get a smooth kickstart to your GSoC journey!</p>
                    </div>
                </div>

                <div className="status-timeline-block">
                    <div className="status-timeline-img status-picture">
                        <span className="image-inside-text">4</span>
                    </div>

                    <div className="status-timeline-content">
                        <h2>What Do Active & Inactive Tags Mean?</h2>
                        <p>The Active/Inactive tags are just a quick reference to help you compare 2–3 organizations — not a primary filter.</p>
                        <p>We assign these tags based on the commit activity in the top 3 repositories over the past 50+ weeks. If the activity crosses a certain threshold, the org is tagged Active; otherwise, it's Inactive.</p>
                        <p>But don’t rely on this alone! An org might:
                            <ul>
                                <li>Take a short break or go inactive temporarily.</li>
                                <li>Be working on a big PR merged all at once (which counts as 1, even if it had lots of work inside).</li>
                            </ul>
                        </p>
                        <p>So, treat these tags as a starting point, not a final decision-maker.</p>
                        <p>Active? Great!</p>
                        <p>Inactive? Dig a little deeper — it might still be a solid choice.</p>
                    </div>
                </div>

                <div className="status-timeline-block">
                    <div className="status-timeline-img status-movie">
                        <span className="image-inside-text">5</span>
                    </div>

                    <div className="status-timeline-content">
                        <h2>Explore Like a Pro</h2>
                        <p>GSoC Hub is packed with features to make your journey smoother — from filtering tools and activity tags to contributor info and social handles.</p>
                        <p>Take a moment to explore each section of the tool. Click around, apply filters, check org histories, and dive into contributor profiles. The more you explore, the better prepared you’ll be!</p>
                        <p>This tool was built with love to give you a head start — so go ahead and make it yours. Your perfect org might be just a few clicks away.</p>
                        <div href="#0" className="status-read-more" onClick={() => navigateTo()}>Start Exploring</div>
                    </div>
                </div>
            </section>
        </div>
    </div>)
}

export default TimeLine;
