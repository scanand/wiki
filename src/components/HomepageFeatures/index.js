import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use - Reactive Java',
    Svg: require('@site/static/img/hero-java-spring-reactive.svg').default,
    description: (
      <>
Symbolizes a balance between traditional Java foundations and event-driven reactive architectures that handle concurrency and scalability efficiently.
      </>
    ),
  },
  {
    title: 'Focus on What Matters - Architecture',
    Svg: require('@site/static/img/hero-reusable-architecture.svg').default,
    description: (
      <>
Demonstrates how interfaces, services, and infrastructure layers interact cohesively to promote maintainable and extensible system design.
      </>
    ),
  },
  {
    title: 'Powered by Cloud - Microservices',
    Svg: require('@site/static/img/hero-cloud-tech.svg').default,
    description: (
      <>
Represents the convergence of microservices, DevOps, and scalable cloud infrastructure powering modern application ecosystems.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
