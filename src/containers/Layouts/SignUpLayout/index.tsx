import classNames from 'classnames'
import { Button } from 'src/components/Button'
import { SuccessICO } from 'src/components/ICO/success-ico'
import { Logo } from 'src/components/Logo'
import { cloneElement, ReactElement } from 'react'
import { useSelectorTyped } from 'src/utils/hooks'
import {
  registration_page,
  stages_wrapper,
  stages_navbar,
  stages_navbar_wrapper,
  navbar_link,
  active_link,
  finished_stage_link,
  link_description,
  navbar_button,
  disabled_stage_link,
} from './style.module.css'
import { LinkText } from '../../../components/LinkText'

interface IProps {
  children: Array<ReactElement>
}

export const SignUpStages = ({ children: allStages }: IProps) => {
  const { currentStage, stages } = useSelectorTyped((state) => state.signup)

  const currentStageWithProps = allStages[currentStage]
    ? cloneElement(allStages[currentStage])
    : undefined

  return (
    <div className={registration_page}>
      <LinkText href="/signin">
        <Logo />
      </LinkText>
      <div className={stages_wrapper}>
        {currentStageWithProps ?? <span>Not Found :(</span>}
      </div>
      <div className={stages_navbar_wrapper}>
        <div className={stages_navbar}>
          {stages.map((stage) => (
            <div
              key={stage.title}
              className={classNames(navbar_link, {
                [active_link]: currentStage === stage.number - 1,
                [disabled_stage_link]: !stages[0].finished,
              })}
            >
              <Button
                className={classNames(navbar_button, {
                  [finished_stage_link]: stage.finished,
                })}
              >
                {stage.finished ? <SuccessICO /> : stage.number}
              </Button>
              <span className={link_description}>{stage.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
