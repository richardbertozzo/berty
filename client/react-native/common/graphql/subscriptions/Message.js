import CommitLogStream from './CommitLogStream'

export default context => ({
  ...CommitLogStream(context),
  subscribe: ({ updater }) =>
    CommitLogStream(context).subscribe({
      updater:
        updater &&
        ((store, data) => {
          const [operation, entity] = [
            data.CommitLogStream.operation,
            data.CommitLogStream.entity.event,
          ]
          if (entity != null && entity.kind === 302) {
            updater(store, entity, operation === 2)
          }
        }),
    }),
})
