import React from 'react'
import { graphql } from 'gatsby'
import GatsbyConfig from '../../gatsby-config'
import CustomHelmet from '../components/CustomHelmet'
import Layout from '../components/indexLayout'
import MemberCard from '../components/member_card'
import { GatsbyImage } from 'gatsby-plugin-image'

function getMembers(data) {
  let president = []
  let vicepresident = []
  let generalsec = []
  let webadmin = []
  let developers = []
  let soswc = []
  let members = []
  let leads = []
  let memberList = data.allMarkdownRemark.edges

  memberList.forEach((element) => {
    if (element.node.frontmatter.designation !== 'Alumni') {
      if (element.node.frontmatter.designation.toUpperCase() === 'PRESIDENT') {
        return president.push(
          <MemberCard
            username={element.node.frontmatter.username}
            full_name={element.node.frontmatter.name}
            designation={element.node.frontmatter.designation}
          />
        )
      } else if (
        element.node.frontmatter.designation.toUpperCase() === 'VICE PRESIDENT'
      ) {
        return vicepresident.push(
          <MemberCard
            username={element.node.frontmatter.username}
            full_name={element.node.frontmatter.name}
            designation={element.node.frontmatter.designation}
          />
        )
      } else if (
        element.node.frontmatter.designation.toUpperCase() ===
        'GENERAL SECRETARY'
      ) {
        return generalsec.push(
          <MemberCard
            username={element.node.frontmatter.username}
            full_name={element.node.frontmatter.name}
            designation={element.node.frontmatter.designation}
          />
        )
      } else if (
        element.node.frontmatter.designation.toUpperCase() ===
          'SOSWC PRESIDENT' ||
        element.node.frontmatter.designation.toUpperCase() ===
          'SOSWC VICE PRESIDENT'
      ) {
        return soswc.push(
          <MemberCard
            username={element.node.frontmatter.username}
            full_name={element.node.frontmatter.name}
            designation={element.node.frontmatter.designation}
          />
        )
      } else if (
        element.node.frontmatter.designation.toUpperCase() === 'WEB LEAD'
      ) {
        return webadmin.push(
          <MemberCard
            username={element.node.frontmatter.username}
            full_name={element.node.frontmatter.name}
            designation={element.node.frontmatter.designation}
          />
        )
      } else if (
        element.node.frontmatter.designation.toUpperCase() ===
          'APP DEVELOPMENT LEAD' ||
        element.node.frontmatter.designation.toUpperCase() ===
          'WEB DEVELOPMENT LEAD'
      ) {
        return developers.push(
          <MemberCard
            username={element.node.frontmatter.username}
            full_name={element.node.frontmatter.name}
            designation={element.node.frontmatter.designation}
          />
        )
      } else if (
        element.node.frontmatter.designation.toUpperCase() !== 'MEMBER'
      ) {
        return leads.push(
          <MemberCard
            username={element.node.frontmatter.username}
            full_name={element.node.frontmatter.name}
            designation={element.node.frontmatter.designation}
          />
        )
      } else {
        return members.push(
          <MemberCard
            username={element.node.frontmatter.username}
            full_name={element.node.frontmatter.name}
            designation={element.node.frontmatter.designation}
          />
        )
      }
    }
  })

  return president.concat(
    vicepresident,
    generalsec,
    webadmin,
    developers,
    soswc,
    leads,
    members
  )
}
function getAlumni(data) {
  let Almembers = []

  let memberList = data.allMarkdownRemark.edges

  memberList.forEach((element) => {
    if (element.node.frontmatter.designation === 'Alumni') {
      return Almembers.push(
        <MemberCard
          username={element.node.frontmatter.username}
          full_name={element.node.frontmatter.name}
          // designation={element.node.frontmatter.designation}
        />
      )
    }
  })

  return Almembers
}
const TeamsPage = ({ data }) => (
  <Layout>
    <CustomHelmet page={GatsbyConfig.siteMetadata.team} />
    <div className="page">
      <div className="container">
        <h2>Community Members</h2>
        <div className="team-section">
          {/* Card for coordinators */}
          <div className="card-link">
            <div className="member-card elevate white-bg">
              <GatsbyImage
                image={data.imageCoord1.childImageSharp.gatsbyImageData}
                className="profile-pic"
              />

              <div className="member-details">
                <h3 className="name">Dr. Mustafa Basthikodi</h3>
                <p className="designation">Faculty Co-ordinator</p>
              </div>
            </div>
          </div>
          {/* <MemberCard
            username="manjesh1"
            full_name="Manjesh P Shetty"
            designation="Mozilla Regional Coordinator"
          /> */}
        </div>
        <h2>Core Members</h2>
        <div className="team-section">{getMembers(data)}</div>
        <h2>Alumni</h2>
        <div className="team-section">{getAlumni(data)}</div>
      </div>
    </div>
  </Layout>
)

export default TeamsPage

export const teamQuery = graphql`
  query membersQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___designation], order: ASC }
      filter: { fileAbsolutePath: { regex: "/members/.*md$/" } }
    ) {
      edges {
        node {
          frontmatter {
            username
            name
            designation
          }
        }
      }
    }
    imageCoord1: file(relativePath: { eq: "images/mustafa_asthikodi.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          width: 200
          placeholder: TRACED_SVG
          layout: CONSTRAINED
        )
      }
    }
  }
`
