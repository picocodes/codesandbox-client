import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import LinkIcon from 'react-icons/lib/fa/external-link';
import NetlifyLogo from 'app/components/NetlifyLogo';
import DeploymentIntegration from 'app/components/DeploymentIntegration';
import getTemplate from 'common/lib/templates';
import { WorkspaceInputContainer, WorkspaceSubtitle } from '../../elements';
import {
  Deploys,
  Deploy,
  Name,
  Link,
  DeploysWrapper,
  Wrapper,
  ButtonContainer,
} from './Elements';

class NetlifyDeployment extends Component {
  state = { show: false };

  toggleNetlify = () =>
    this.setState(state => ({
      show: !state.show,
    }));

  componentDidMount() {
    this.props.signals.deployment.getNetlifyDeploys();
  }

  render() {
    const {
      store: { deployment, editor },
      signals,
    } = this.props;

    const template = getTemplate(editor.currentSandbox.template);
    const { show } = this.state;
    return (
      template.netlify !== false && (
        <Wrapper loading={deployment.deploying}>
          <WorkspaceInputContainer
            style={{ marginTop: '1rem', marginBottom: 0 }}
          >
            <DeploymentIntegration
              loading={deployment.deploying}
              open={show}
              toggle={() => this.toggleNetlify()}
              color="#F7F8F8"
              light
              Icon={NetlifyLogo}
              name="netlify"
              deploy={() => signals.deployment.deployWithNetlify()}
            >
              Deploy your sandbox site on{' '}
              <a
                href="https://netlify.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                Netlify
              </a>
            </DeploymentIntegration>
          </WorkspaceInputContainer>
          {deployment.netlifySite && show ? (
            <DeploysWrapper
              css={`
                background: #f7f8f8;
                margin-top: -4px;
              `}
            >
              <WorkspaceSubtitle>Sandbox Site</WorkspaceSubtitle>
              <WorkspaceInputContainer>
                <Deploys>
                  <Deploy key={deployment.netlifySite.uid}>
                    <Name light>{deployment.netlifySite.name}</Name>
                    <ButtonContainer>
                      <Link
                        href={deployment.netlifySite.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <LinkIcon /> <span>Visit</span>
                      </Link>
                      {deployment.netlifyClaimUrl ? (
                        <Link
                          href={deployment.netlifyClaimUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <span>Claim Site</span>
                        </Link>
                      ) : null}
                    </ButtonContainer>
                  </Deploy>
                </Deploys>
              </WorkspaceInputContainer>
            </DeploysWrapper>
          ) : null}
        </Wrapper>
      )
    );
  }
}
export default inject('signals', 'store')(observer(NetlifyDeployment));
