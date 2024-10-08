type RecommendationInfo = {
    readonly author: string
    readonly source: string
    readonly contents: string
}

export async function fetchRecommendations(): Promise<RecommendationInfo[]> {
    // TODO: Move these over to Turso
    return [
        {
            author: "Steven McGill",
            source: "https://www.linkedin.com/in/stevenmcgill",
            contents: `
                I've had the privilege of working with Simon twice in my career, most recently as his direct manager in his role as a Senior Full Stack Developer. His impact on our team and projects has been consistently outstanding.
                Simon's technical proficiency, particularly in JavaScript/TypeScript and PHP, is truly impressive. He consistently delivers high-quality work, meeting tight deadlines without compromising on code quality.
                What sets Simon apart is his ability to create well-structured, easily understandable codebases. Whenever I work in a system set up by Simon, I'm always impressed by its clarity and organisation.
                Beyond his technical skills, Simon's eagerness to learn and adapt to new technologies is admirable. He approaches each new challenge with enthusiasm, constantly expanding his already substantial skill set.
                As a team member, Simon is invaluable. He's approachable, friendly, and not afraid to voice his opinions when it matters. His ability to communicate complex technical concepts clearly makes him an asset in team discussions and planning sessions.
                Having managed Simon directly, I can attest to his professionalism and reliability. He's the kind of developer you can trust with critical projects, knowing he'll not only meet but often exceed expectations.
            `,
        },
        {
            author: "Mark Eliasen",
            source: "https://www.linkedin.com/in/markeliasen",
            contents: `
                Simon is a very experienced engineer. From complex UI made simple, to complex backend problems made understandable.
                You throw any task at him and he will come back with solution, within the constraint, to a level of quality surpassing the time constraint.
                I cannot recommend Simon enough, any team which is lucky to have him will have a very dependable, knowledgeable and approachable member added to their ranks.
            `,
        },
        {
            author: "Loïc Fontaine",
            source: "https://www.linkedin.com/in/fontaine-loic",
            contents: `
                I had the opportunity to collaborate with Simon on two projects, his modesty only underscores his impressive technical expertise.
                Simon's deep understanding of both front-end and back-end development truly makes him a standout software developer. His ability to navigate complex concepts with ease is remarkable, and he consistently delivers efficient and high-quality work.
            `,
        },
        {
            author: "Ben Payne Hunt",
            source: "https://www.linkedin.com/in/benjamin-payne-hunt",
            contents: `
                I had the pleasure of working alongside Simon during my time at Shift: initially as part of his team before moving on to run my own. While a part of Simon's team I was continually impressed by the manner in which he coordinated the completion of complex tasks while continuing to be a major individual contributor. As a fellow lead I was impressed at the ownership and responsibility Simon demonstrated for features and their translation into value delivery for the wider team and the company as a whole.`,
        },
    ]
}
